// src/types.ts

// UPDATED: Added "prefer_not_to_say"
export type Gender = "male" | "female" | "other" | "prefer_not_to_say";

// NEW: Created a dedicated type for bot preference for clarity
export type BotPreference = "male" | "female" | "mixed" | "other";

export type LanguageAbility =
  | "Beginner (HSK 1-2)"
  | "Intermediate (HSK 3)"
  | "Intermediate High (HSK 4)"
  | "Advanced (HSK 5+)";

export type Stage =
  | "profile_creation"
  | "bot_intro"
  | "language_quiz"
  | "quiz_results"
  | "initial_impressions"
  | "qna"
  | "final_choice"
  | "game_over";

export interface Bot {
  id: string;
  name: string;
  gender: "male" | "female"; // Bots remain male or female for simplicity
  bio: string;
  profilePic: string;
  lightOn: boolean;
  initialReaction?: string;
}

export interface ChatMessage {
  role: "user" | "model";
  text: string;
  speaker?: string;
  gender?: Gender;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
}