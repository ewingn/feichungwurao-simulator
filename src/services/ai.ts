// src/services/ai.ts
import { Bot, ChatMessage, Gender } from "../types";

// This is a mock implementation to satisfy the compiler.
// Replace with your actual Gemini API calls.

interface ChatOptions {
  bot: Bot;
  prompt: string;
  chatHistory: ChatMessage[];
  playerPhotoBase64?: string;
  photoMimeType?: string;
  apiKey: string;
}

// FIX: This function now correctly accepts a single options object.
export const chatWithBot = async (options: ChatOptions): Promise<string> => {
  console.log("Chatting with bot using API Key:", options.apiKey ? "provided" : "missing");
  return `你好，我对你的资料很感兴趣。 (Hello, I'm very interested in your profile.)`;
};


// FIX: This function now correctly accepts 3 arguments.
// The 'gender' parameter is correctly typed as "male" | "female" for bots.
export const generateBotProfile = async (
  gender: "male" | "female",
  index: number,
  apiKey: string
): Promise<Bot> => {
  console.log("Generating bot with API Key:", apiKey ? "provided" : "missing");
  const name = gender === "female" ? `女嘉宾 #${index + 1}` : `男嘉宾 #${index + 1}`;
  return {
    id: `bot-${index}`,
    name: name,
    gender: gender,
    bio: `我是${name}，我喜欢旅行和编程。 (I am ${name}, I like traveling and programming.)`,
    profilePic: `https://i.pravatar.cc/150?u=bot${index}`,
    lightOn: true,
  };
};

// FIX: This function now correctly accepts 4 arguments.
export const speak = async (
    text: string,
    speakerGender: "male" | "female", // TTS voices are typically male or female
    audioElement: HTMLAudioElement,
    apiKey: string
): Promise<void> => {
    console.log(`TTS for text: "${text}" with gender: ${speakerGender} and API key: ${apiKey ? "provided" : "missing"}`);
    if (audioElement) {
        console.log("Audio element is ready for playback.");
    }
    return Promise.resolve();
};