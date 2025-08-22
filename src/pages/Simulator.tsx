import React, { useState, useEffect, useRef, useCallback } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import ProfileCreation from "../components/ProfileCreation";
import LanguageQuiz from "../components/LanguageQuiz";
import QuizResults from "../components/QuizResults";
import GameArena from "../components/GameArena";
import { Bot, Gender, LanguageAbility, ChatMessage, QuizQuestion, Stage, BotPreference } from "../types";
import { hskQuizQuestions } from "../data/hskQuizQuestions";
import { generateBotProfile, speak, chatWithBot } from "../services/ai";

const API_KEY = ""; // Your API Key

const Simulator: React.FC = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [playerName, setPlayerName] = useState("");
  const [playerGender, setPlayerGender] = useState<Gender>("male");
  const [playerAge, setPlayerAge] = useState("");
  const [playerOccupation, setPlayerOccupation] = useState("");
  const [playerInterests, setPlayerInterests] = useState("");
  const [playerPhoto, setPlayerPhoto] = useState<File | null>(null);
  const [playerPhotoBase64, setPlayerPhotoBase64] = useState("");
  const [botPreference, setBotPreference] = useState<BotPreference>("female");
  const [playerLanguageAbility, setPlayerLanguageAbility] = useState<LanguageAbility>("Beginner (HSK 1-2)");
  const [gameStage, setGameStage] = useState<Stage>("profile_creation");
  const [bots, setBots] = useState<Bot[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [selectedBotForChat, setSelectedBotForChat] = useState<Bot | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [userChatInput, setUserChatInput] = useState("");
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuizQuestionIndex, setCurrentQuizQuestionIndex] = useState(0);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hostCommentary, setHostCommentary] = useState("Let's see what our contestants think of our new arrival!");
  const [initialLightsOffCount, setInitialLightsOffCount] = useState(0);

  useEffect(() => {
    try {
      const firebaseConfig = typeof __firebase_config !== 'undefined'
        ? JSON.parse(__firebase_config)
        : { apiKey: "your-local-key", authDomain: "your-local-domain", projectId: "your-local-project-id" };

      const app = initializeApp(firebaseConfig);
      const authInstance = getAuth(app);

      const unsubscribe = onAuthStateChanged(authInstance, async (user: FirebaseUser | null) => {
        if (user) {
          setUserId(user.uid);
        } else {
          const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;
          try {
            if (initialAuthToken) {
              await signInWithCustomToken(authInstance, initialAuthToken);
            } else {
              await signInAnonymously(authInstance);
            }
          } catch (error) {
            console.error("Firebase auth error:", error);
            setMessage("Authentication failed.");
          }
        }
        setIsAuthReady(true);
      });
      return () => unsubscribe();
    } catch (error) {
      console.error("Firebase init failed:", error);
      setMessage("Firebase initialization failed.");
    }
  }, []);

  const getPlayerContestantTitle = (gender: Gender): string => {
    switch (gender) {
      case "male": return "男嘉宾";
      case "female": return "女嘉宾";
      case "other":
      case "prefer_not_to_say": return "嘉宾";
    }
  };

  const generateBots = useCallback(async () => {
    setLoading(true);
    setMessage("Generating contestant profiles...");
    const numBots = 10;
    const arr: Bot[] = [];
    for (let i = 0; i < numBots; i++) {
      let gender: "male" | "female";
      if (botPreference === 'male' || botPreference === 'female') {
        gender = botPreference;
      } else {
        gender = (i % 2 === 0) ? "female" : "male";
      }
      const bot = await generateBotProfile(gender, i, API_KEY);
      arr.push(bot);
    }
    setBots(arr);
    setMessage("");
    setLoading(false);
    setGameStage("language_quiz");
  }, [botPreference]);

  const getBotLLMResponse = useCallback(async (bot: Bot, userPrompt: string) => {
    setLoading(true);
    setMessage(`Getting response from ${bot.name}...`);
    try {
      const text = await chatWithBot({
        bot,
        prompt: `${userPrompt}\nPlease respond in Chinese, keep it concise.`,
        chatHistory,
        playerPhotoBase64,
        photoMimeType: playerPhoto?.type || '',
        apiKey: API_KEY,
      });
      return text;
    } catch (e) {
      console.error("Error getting bot response:", e);
      return "Sorry, I couldn't generate a response.";
    } finally {
      setLoading(false);
      setMessage("");
    }
  }, [chatHistory, playerPhoto, playerPhotoBase64]);
  
  const handleInitialImpressions = useCallback(async () => {
    setLoading(true);
    setHostCommentary("The results are in! Let's see the lights...");
    setMessage("Contestants are reacting to your profile and quiz score...");

    const maxScore = quizQuestions.length;
    const quizPercentage = maxScore > 0 ? quizScore / maxScore : 0;
    let lightsOffCount = 0;

    const updatedBots = await Promise.all(
      bots.map(async (bot, index) => {
        const prompt = `You are a female contestant on the dating show Fei Cheng Wu Rao. A male contestant named ${playerName} (${playerAge}, ${playerOccupation}) has just been introduced. His Chinese quiz score was ${Math.round(quizPercentage * 100)}%. His interests are ${playerInterests}. Based on this, give a short, funny, or critical reaction in Chinese and decide if you will keep your light on ("亮灯!") or turn it off ("灭灯!"). Be creative, like the real show.`;
        const reaction = await getBotLLMResponse(bot, prompt);
        let lightOn = !/灭灯/.test(reaction);

        if (quizPercentage < 0.6 && index < 5 && Math.random() > 0.3) {
            lightOn = false;
        }
        if (quizPercentage < 0.4) {
            if (Math.random() > 0.2) lightOn = false;
        }

        if (!lightOn) {
            lightsOffCount++;
        }
        return { ...bot, initialReaction: reaction, lightOn: lightOn };
      })
    );

    setInitialLightsOffCount(lightsOffCount);

    if (lightsOffCount > bots.length / 2) {
        setHostCommentary(`哦, a tough start! ${lightsOffCount} lights went out. Let's see if he can win them back.`);
    } else if (lightsOffCount === 0) {
        setHostCommentary(`Wow, a perfect score! All lights are still on! An amazing start!`);
    } else {
        setHostCommentary(`Not bad! Only ${lightsOffCount} light(s) went out. There's still a great chance!`);
    }

    setBots(updatedBots);
    setLoading(false);
    setMessage("");
    setGameStage("qna");
  }, [bots, playerName, playerAge, playerOccupation, playerInterests, quizScore, quizQuestions.length, getBotLLMResponse]);

  const handlePlayerProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName || !playerAge || !playerOccupation || !playerInterests) {
      setMessage("Please fill in all profile fields.");
      return;
    }
    const q = hskQuizQuestions[playerLanguageAbility] || hskQuizQuestions["Beginner (HSK 1-2)"];
    setQuizQuestions(q);
    setCurrentQuizQuestionIndex(0);
    setQuizScore(0);
    setSelectedQuizAnswer(null);
    await generateBots();
  };

  const handleNextQuizQuestion = () => {
    if (selectedQuizAnswer === quizQuestions[currentQuizQuestionIndex].answer) {
      setQuizScore((s) => s + 1);
    }
    if (currentQuizQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuizQuestionIndex((i) => i + 1);
      setSelectedQuizAnswer(null);
    } else {
      setGameStage("quiz_results");
    }
  };

  const handleProceedAfterQuiz = async () => {
    setGameStage("initial_impressions");
    await handleInitialImpressions();
  };

  const handleSendChatMessage = async () => {
    if (!userChatInput.trim() || !selectedBotForChat) return;
    const userMsg: ChatMessage = { role: "user", text: userChatInput };
    setChatHistory((prev) => [...prev, userMsg]);
    setUserChatInput("");
    const txt = await getBotLLMResponse(selectedBotForChat, userMsg.text);
    const botMsg: ChatMessage = { role: "model", text: txt, speaker: selectedBotForChat.name, gender: selectedBotForChat.gender };
    setChatHistory((prev) => [...prev, botMsg]);
    await handleSpeakText(txt, selectedBotForChat.gender, selectedBotForChat.name);
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPlayerPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        const b64 = String(reader.result || "");
        const comma = b64.indexOf(",");
        setPlayerPhotoBase64(comma >= 0 ? b64.slice(comma + 1) : "");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBotLightToggle = (botId: string) => {
    setBots((prev) => prev.map((b) => (b.id === botId ? { ...b, lightOn: !b.lightOn } : b)));
  };

  const handleSpeakText = async (text: string, speakerGender: Gender, botName: string) => {
    if (!audioRef.current) return;
    setLoading(true);
    setMessage(`Playing audio from ${botName}...`);
    try {
      const voiceGender = (speakerGender === 'other' || speakerGender === 'prefer_not_to_say') ? 'female' : speakerGender;
      await speak(text, voiceGender, audioRef.current, API_KEY);
    } catch (e) {
      console.error("Error speaking text:", e);
      setMessage("Failed to generate speech.");
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  const startRecording = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        mediaRecorderRef.current.ondataavailable = (e) => audioChunksRef.current.push(e.data);
        mediaRecorderRef.current.onstop = () => {
            const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
            console.log("Recorded blob:", blob);
            setMessage("Recording finished! (STT not yet implemented)");
        };
        mediaRecorderRef.current.start();
        setIsRecording(true);
        setMessage("Recording...");
    } catch (e) {
        console.error(e);
        setMessage("Microphone access denied.");
    }
  };

  const stopRecording = () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
          mediaRecorderRef.current.stop();
          setIsRecording(false);
      }
  };
  
  const handleAnswerSelection = (opt: string) => setSelectedQuizAnswer(opt);

  const renderStage = () => {
    switch (gameStage) {
      case "profile_creation":
        return <ProfileCreation {...{ playerName, setPlayerName, playerGender, setPlayerGender, playerAge, setPlayerAge, playerOccupation, setPlayerOccupation, playerInterests, setPlayerInterests, playerPhoto, playerPhotoBase64, setPlayerPhoto, setPlayerPhotoBase64, botPreference, setBotPreference, playerLanguageAbility, setPlayerLanguageAbility, handlePlayerProfileSubmit, handlePhotoUpload, loading, message }} />;
      case "language_quiz":
        return <LanguageQuiz {...{ quizQuestions, currentQuizQuestionIndex, selectedQuizAnswer, handleAnswerSelection, handleNextQuizQuestion, loading }} />;
      case "quiz_results":
        return <QuizResults {...{ quizScore, totalQuestions: quizQuestions.length, playerLanguageAbility, handleProceedAfterQuiz, loading }} />;
      default:
        return <GameArena {...{ gameStage, setGameStage, bots, setBots, loading, message, selectedBotForChat, setSelectedBotForChat, chatHistory, setChatHistory, userChatInput, setUserChatInput, handleBotLightToggle, handleSendChatMessage, speakText: handleSpeakText, startRecording, stopRecording, isRecording, playerLanguageAbility, audioRef, hostCommentary, initialLightsOffCount }} />;
    }
  };

  return <>{renderStage()}</>;
};

export default Simulator;
