import { GoogleGenAI, Type } from "@google/genai";
import { GeneratedResult } from "../types";

export const generateLotteryNumbers = async (
  gameName: string,
  quantity: number
): Promise<GeneratedResult> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
    Atue como um estatístico especialista em loterias brasileiras (Caixa Econômica Federal).
    
    Tarefa: Gerar um palpite para o jogo "${gameName}" com exatamente ${quantity} escolhas.
    
    Contexto: Analise (simule) os dados históricos dos últimos 10 anos deste jogo específico. Identifique padrões de "números quentes" (que saem muito) e "números frios" (atrasados). 
    
    Regras Específicas:
    - Para "Dia de Sorte", inclua o Mês de Sorte como o último item do array.
    - Para "Loteca", gere uma sequência de 14 palpites entre "Coluna 1", "Empate" ou "Coluna 2".
    - Para "Super Sete", gere 7 números, um para cada coluna (0-9).
    - Para os demais (Mega, Quina, etc), gere números inteiros dentro do range do jogo.
    
    Saída JSON Obrigatória:
    - generatedNumbers: Array de strings com os números ou palpites gerados.
    - reasoning: Uma explicação breve (max 2 frases) sobre por que essa combinação foi escolhida (ex: equilíbrio entre pares/ímpares, baseada em sorteios de 2023, etc).
    - hotNumbers: Lista de 3-5 números que estatisticamente têm saído muito neste jogo.
    - coldNumbers: Lista de 3-5 números que estão "atrasados".
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            generatedNumbers: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Os números gerados ou palpites"
            },
            reasoning: {
              type: Type.STRING,
              description: "Explicação estatística breve"
            },
            hotNumbers: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Números com alta frequência histórica"
            },
            coldNumbers: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "Números atrasados ou com baixa frequência recente"
            }
          },
          required: ["generatedNumbers", "reasoning", "hotNumbers", "coldNumbers"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as GeneratedResult;
  } catch (error) {
    console.error("Error generating numbers:", error);
    throw error;
  }
};