import React from 'react';
import { Bot, ChatMessage, Stage, Gender } from '../types';
import { Lightbulb, LightbulbOff, MessageSquare, Info } from 'lucide-react';

interface GameArenaProps {
  gameStage: Stage;
  bots: Bot[];
  loading: boolean;
  message: string;
  selectedBotForChat: Bot | null;
  setSelectedBotForChat: (bot: Bot | null) => void;
  chatHistory: ChatMessage[];
  userChatInput: string;
  setUserChatInput: (input: string) => void;
  handleBotLightToggle: (id: string) => void;
  handleSendChatMessage: () => void;
  speakText: (txt: string, gender: Gender, botName: string) => void | Promise<void>;
  hostCommentary: string;
  initialLightsOffCount: number; // New prop for the summary message
}

const GameArena: React.FC<GameArenaProps> = ({
  bots,
  loading,
  selectedBotForChat,
  setSelectedBotForChat,
  chatHistory,
  userChatInput,
  setUserChatInput,
  handleSendChatMessage,
  hostCommentary,
  initialLightsOffCount,
}) => {
  return (
    <div className="bg-gray-900 rounded-2xl shadow-2xl p-4 sm:p-6 border-4 border-purple-500/50 animate-fade-in space-y-6">
      
      {/* NEW: Summary Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 p-4 rounded-lg flex items-center gap-4">
        <Info size={24} className="flex-shrink-0" />
        <div>
          <h3 className="font-bold">The First Impression!</h3>
          <p className="text-sm">
            Based on your profile and quiz results, <strong>{initialLightsOffCount}</strong> contestant(s) turned off their lights. You can still win them back!
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Contestant Podiums */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {bots.map((bot) => (
              <div
                key={bot.id}
                className={`relative rounded-lg p-2 text-center transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                  bot.lightOn ? 'bg-indigo-800 shadow-lg shadow-indigo-500/30' : 'bg-gray-700'
                }`}
                onClick={() => setSelectedBotForChat(bot)}
              >
                <div className={`absolute top-2 right-2 p-1 rounded-full ${bot.lightOn ? 'bg-yellow-400 text-yellow-900' : 'bg-gray-600 text-gray-400'}`}>
                  {bot.lightOn ? <Lightbulb size={14} /> : <LightbulbOff size={14} />}
                </div>
                
                {/* UPDATED: Image now uses cartoon avatars and has a grayscale filter when light is off */}
                <img 
                  src={`https://api.multiavatar.com/${bot.name}.svg`} 
                  alt={bot.name} 
                  className={`w-20 h-20 mx-auto rounded-full object-cover border-4 border-gray-600 mb-2 transition-all duration-300 ${
                    !bot.lightOn && 'filter grayscale opacity-50'
                  }`} 
                />
                
                <p className={`text-sm font-bold truncate transition-colors ${bot.lightOn ? 'text-white' : 'text-gray-400'}`}>{bot.name}</p>
                <p className={`text-xs transition-colors ${bot.lightOn ? 'text-indigo-300' : 'text-gray-500'}`}>{bot.gender === 'female' ? '女嘉宾' : '男嘉宾'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Host and Chat */}
        <div className="lg:col-span-1 space-y-4">
          {/* Host Commentary */}
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-4 rounded-lg shadow-lg">
            <p className="font-bold text-lg">孟非 (Host):</p>
            <p className="text-white text-opacity-90 italic">"{hostCommentary}"</p>
          </div>

          {/* Chat Panel */}
          <div className="bg-gray-800 p-4 rounded-lg shadow-inner">
            <h3 className="font-semibold text-white mb-2">
              {selectedBotForChat ? `Chatting with ${selectedBotForChat.name}` : 'Select a Contestant to Chat'}
            </h3>
            <div className="h-48 overflow-y-auto bg-gray-900 rounded p-2 mb-2 space-y-2">
              {chatHistory.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs px-3 py-1 rounded-lg ${m.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-200'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                className="flex-1 bg-gray-700 border border-gray-600 rounded p-2 text-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                placeholder="Type your message..."
                value={userChatInput}
                onChange={(e) => setUserChatInput(e.target.value)}
                disabled={!selectedBotForChat || loading}
              />
              <button onClick={handleSendChatMessage} disabled={!selectedBotForChat || loading} className="rounded bg-indigo-600 text-white px-4 hover:bg-indigo-500 disabled:opacity-50">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameArena;
