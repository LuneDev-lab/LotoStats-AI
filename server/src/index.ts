import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mercadopago from 'mercadopago';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import bcrypt from 'bcryptjs';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ENV variables (ver .env.example)
const MP_ACCESS_TOKEN = process.env.MP_ACCESS_TOKEN || '';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';
const JWT_SECRET = process.env.JWT_SECRET || 'troque_esta_chave_em_producao';
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

// Simple users storage (JSON file) for demo purposes
const USERS_FILE = path.join(__dirname, '..', 'users.json');

type UserRecord = {
  email: string;
  name?: string;
  passwordHash: string;
};

const readUsers = (): UserRecord[] => {
  try {
    if (!fs.existsSync(USERS_FILE)) return [];
    const raw = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(raw) as UserRecord[];
  } catch (err) {
    console.error('readUsers error', err);
    return [];
  }
};

const writeUsers = (users: UserRecord[]) => {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
  } catch (err) {
    console.error('writeUsers error', err);
  }
};

if (!MP_ACCESS_TOKEN) {
  console.warn('MP_ACCESS_TOKEN is not set. Mercado Pago calls will fail.');
}

mercadopago.configurations.setAccessToken(MP_ACCESS_TOKEN);

/**
 * Create Mercado Pago preference (checkout pro)
 * Body: { email: string }
 * Returns: { init_point, preference_id }
 */
app.post('/api/create_preference', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });

    const preference = {
      items: [
        {
          id: 'lotostats_pro',
          title: 'LotoStats - Acesso Vitalício',
          quantity: 1,
          unit_price: 9.9
        }
      ],
      payer: {
        email
      },
      external_reference: email,
      back_urls: {
        success: `${FRONTEND_URL}/payment-success`,
        failure: `${FRONTEND_URL}/payment-failed`,
        pending: `${FRONTEND_URL}/payment-pending`
      },
      auto_return: 'approved'
    };

    const response = await mercadopago.preferences.create(preference);
    return res.json({
      init_point: response.body.init_point,
      preference_id: response.body.id
    });
  } catch (err: any) {
    console.error('create_preference error', err?.response?.body || err.message || err);
    return res.status(500).json({ error: 'failed to create preference' });
  }
});

/**
 * Register user (simple demo persistence + JWT)
 * Body: { email, password, name? }
 */
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    const users = readUsers();
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) return res.status(400).json({ error: 'user already exists' });

    const passwordHash = await bcrypt.hash(password, 8);
    const newUser: UserRecord = { email, name: name || email.split('@')[0], passwordHash };
    users.push(newUser);
    writeUsers(users);

    const token = jwt.sign({ email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { email: newUser.email, name: newUser.name } });
  } catch (err: any) {
    console.error('register error', err.message || err);
    return res.status(500).json({ error: 'failed to register' });
  }
});

/**
 * Login user
 * Body: { email, password }
 */
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ error: 'email and password are required' });

    const users = readUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(401).json({ error: 'invalid credentials' });

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) return res.status(401).json({ error: 'invalid credentials' });

    const token = jwt.sign({ email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '7d' });
    return res.json({ token, user: { email: user.email, name: user.name } });
  } catch (err: any) {
    console.error('login error', err.message || err);
    return res.status(500).json({ error: 'failed to login' });
  }
});

/**
 * Forgot password (mock): logs a reset link and returns OK
 * Body: { email }
 */
app.post('/api/auth/forgot', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: 'email is required' });
    const users = readUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) return res.status(200).json({ ok: true, message: 'If the account exists, a reset link was sent (mock).' });

    // In real app send email with reset token. Here we just log.
    console.log(`Password reset requested for ${email} (mock)`);
    return res.json({ ok: true });
  } catch (err: any) {
    console.error('forgot error', err.message || err);
    return res.status(500).json({ error: 'failed to process request' });
  }
});

/**
 * Confirm payment
 * This endpoint expects query params provided by Mercado Pago redirect after payment or the client:
 * - collection_id (payment id) OR merchant_order_id / preference_id
 * Example: GET /api/confirm_payment?collection_id=123456
 *
 * If payment is approved, returns { success: true, token }
 * token is a JWT that grants access (vitalício by default, long expiry).
 */
app.get('/api/confirm_payment', async (req, res) => {
  try {
    const collection_id = req.query.collection_id as string | undefined;
    const preference_id = req.query.preference_id as string | undefined;
    const merchant_order_id = req.query.merchant_order_id as string | undefined;

    // We prefer collection_id (payment id) which allows direct lookup
    if (!collection_id && !preference_id && !merchant_order_id) {
      return res.status(400).json({ error: 'collection_id or preference_id or merchant_order_id required' });
    }

    // If we have collection_id, fetch the payment
    if (collection_id) {
      const paymentResp = await axios.get(`https://api.mercadopago.com/v1/payments/${collection_id}`, {
        headers: {
          Authorization: `Bearer ${MP_ACCESS_TOKEN}`
        }
      });
      const payment = paymentResp.data;
      const status = payment.status; // e.g. 'approved'
      const payerEmail = payment.payer?.email || payment.external_reference || req.query.external_reference || null;

      if (status === 'approved') {
        // Issue JWT (vitalício = long expiry). Choose lifetime as you need.
        const token = jwt.sign(
          {
            email: payerEmail,
            paid: true,
            provider: 'mercadopago'
          },
          JWT_SECRET,
          { expiresIn: '20y' } // 20 years; change for your policy
        );
        return res.json({ success: true, token });
      } else {
        return res.json({ success: false, status });
      }
    }

    // If only preference_id is provided, search payments by preference
    if (preference_id) {
      const searchResp = await axios.get(
        `https://api.mercadopago.com/merchant_orders/search?preference_id=${preference_id}`,
        { headers: { Authorization: `Bearer ${MP_ACCESS_TOKEN}` } }
      );
      const results = searchResp.data.results || [];
      // iterate results to find approved payment
      for (const order of results) {
        const payments = order.payments || [];
        for (const p of payments) {
          if (p.status === 'approved') {
            const token = jwt.sign(
              { email: order.external_reference || p.payer?.email, paid: true },
              JWT_SECRET,
              { expiresIn: '20y' }
            );
            return res.json({ success: true, token });
          }
        }
      }
      return res.json({ success: false, message: 'no approved payment found yet' });
    }

    // fallback
    return res.status(400).json({ error: 'unable to verify payment with provided params' });
  } catch (err: any) {
    console.error('confirm_payment error', err?.response?.data || err.message || err);
    return res.status(500).json({ error: 'failed to confirm payment' });
  }
});

/**
 * Example protected route (to verify token on frontend)
 */
app.get('/api/me', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth) return res.status(401).json({ error: 'missing authorization' });
  const token = auth.replace('Bearer ', '');
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return res.json({ ok: true, payload });
  } catch (err) {
    return res.status(401).json({ error: 'invalid token' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
