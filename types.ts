
export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Hadith {
  text: string;
  source: string;
  arabic?: string;
}

export enum GameMode {
  HOME = 'HOME',
  QUIZ = 'QUIZ',
  WORD_GUESS = 'WORD_GUESS',
  AI_CHAT = 'AI_CHAT'
}

export interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}
