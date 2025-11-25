import React from 'react';
import { AlertTriangle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          <div>
            <h5 className="text-white font-bold text-lg mb-1">LotoStats AI</h5>
            <p className="text-sm">Estatística aplicada a sorte.</p>
          </div>
          <div className="text-sm text-right">
            &copy; {new Date().getFullYear()} Todos os direitos reservados.
          </div>
        </div>
        
        <div className="pt-8 flex items-start gap-3 max-w-3xl mx-auto bg-slate-800/50 p-6 rounded-xl border border-slate-800">
          <AlertTriangle className="w-6 h-6 text-yellow-500 flex-shrink-0" />
          <p className="text-xs md:text-sm leading-relaxed text-slate-300">
            <strong>Aviso Legal:</strong> Este gerador é apenas uma ferramenta educacional e de entretenimento baseada em modelos probabilísticos de Inteligência Artificial. Loterias são jogos de azar e nenhum sistema, estatística ou previsão pode garantir resultados futuros ou ganhos financeiros. Jogue responsavelmente e apenas se for maior de 18 anos. Se você ou alguém que você conhece tem problemas com jogos, procure ajuda profissional.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;