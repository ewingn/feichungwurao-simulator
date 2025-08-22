import React from 'react';
import { BrainCircuit, MessageSquare, Mic, Code, HeartPulse, Sparkles, Database, Wind, Bot } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-shadow h-full">
    <div className="flex items-center gap-4 mb-3">
      <div className="bg-indigo-100 p-2 rounded-lg">{icon}</div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{children}</p>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto animate-fade-in space-y-16">
      {/* Mission Statement Section */}
      <div className="text-center">
        <HeartPulse className="mx-auto text-purple-500 mb-4" size={48} />
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Our Mission</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          To provide an immersive and entertaining platform for Chinese language learners to practice their skills in a realistic, interactive context.
        </p>
      </div>

      {/* Combined Technical & Feature Showcase Section */}
      <div>
        <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">Features & Technology</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard icon={<BrainCircuit className="text-indigo-500" size={24} />} title="Interactive AI Experience">
            Go beyond flashcards. Create a profile, take a language quiz, and engage in real conversations with AI-powered contestants.
          </FeatureCard>
          <FeatureCard icon={<Bot className="text-indigo-500" size={24} />} title="Google Gemini API">
            The core AI logic is powered by the Gemini API. This includes contestant profile generation, in-character chat responses, and Chinese Text-to-Speech (TTS) audio.
          </FeatureCard>
          <FeatureCard icon={<Code className="text-indigo-500" size={24} />} title="React & TypeScript">
            The entire frontend is built as a single-page application using React, ensuring a dynamic and responsive user experience. TypeScript is used for robust, type-safe code.
          </FeatureCard>
          <FeatureCard icon={<Wind className="text-indigo-500" size={24} />} title="Tailwind CSS">
            All styling is handled with Tailwind CSS, following a utility-first methodology for rapid and consistent UI development without leaving the HTML.
          </FeatureCard>
          <FeatureCard icon={<MessageSquare className="text-indigo-500" size={24} />} title="Prompt Engineering">
            Contestant personalities and reactions are shaped through carefully crafted prompts, demonstrating an understanding of how to guide and ground large language models.
          </FeatureCard>
           <FeatureCard icon={<Database className="text-indigo-500" size={24} />} title="Firebase">
            Utilizes Firebase for backend services, including user authentication to provide a seamless and secure sign-in experience for the simulator.
          </FeatureCard>
        </div>
      </div>

      {/* "Just for Fun" Section */}
      <div className="text-center bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
        <Sparkles className="mx-auto text-yellow-500 mb-4" size={48} />
        <h2 className="text-3xl font-bold text-purple-700 mb-4">A Note From The Creator</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Hey there! I built this simulator as a personal project to blend my interests in language learning and AI. It's meant to be a fun, lighthearted tool for practice, not a super-serious dating app. So dive in, have a laugh, and hopefully learn a thing or two. Thanks for stopping by!
        </p>
      </div>
    </div>
  );
};

export default About;
