
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage } from "../types";

// Always initialize GoogleGenAI using process.env.API_KEY directly.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getIslamicAIResponse = async (history: ChatMessage[], message: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history,
        { role: 'user', parts: [{ text: message }] }
      ],
      config: {
        systemInstruction: `You are a helpful and respectful Islamic Scholar Assistant named 'Nur AI'. 
        Provide accurate information based on the Quran and authentic Hadith. 
        Always respond in Bengali. 
        If a question is not related to Islam, politely redirect the conversation.
        Keep answers concise and educational.`,
        temperature: 0.7,
        topP: 0.95,
      }
    });

    // response.text is a property, not a method.
    return response.text || "দুঃখিত, আমি এই মুহূর্তে উত্তর দিতে পারছি না।";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "একটি ত্রুটি ঘটেছে। অনুগ্রহ করে আবার চেষ্টা করুন।";
  }
};

export const generateDailyVerse = async () => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: "একটি অনুপ্রেরণামূলক কুরআনের আয়াত এবং তার অর্থ বাংলা ও আরবিতে দাও। সাথে একটি ছোট ব্যাখ্যাও দিও।",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            arabic: { type: Type.STRING },
            bengali: { type: Type.STRING },
            reference: { type: Type.STRING },
            explanation: { type: Type.STRING }
          },
          required: ["arabic", "bengali", "reference", "explanation"]
        }
      }
    });
    // Safely parse JSON string extracted from the text property.
    const jsonStr = response.text?.trim();
    return jsonStr ? JSON.parse(jsonStr) : null;
  } catch (error) {
    console.error("Daily Verse Error:", error);
    return null;
  }
};
