import React from 'react';
import { PlayCircle, Heart, User, Award, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="animate-fade-in space-y-20">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-800">
            The fun and effective way to practice your{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 text-transparent bg-clip-text">
              Chinese
            </span>
            .
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-lg mx-auto md:mx-0">
            Welcome to the Fei Cheng Wu Rao Simulator! Create your profile, take the quiz, and interact with AI contestants in an immersive dating show experience.
          </p>
          <div className="mt-10">
            <Link 
              to="/simulator" 
              className="inline-flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xl py-4 px-8 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            >
              <PlayCircle size={28} />
              Start the Show!
            </Link>
          </div>
        </div>
        <div className="hidden md:flex justify-center items-center">
          <div className="w-96 h-96 bg-gradient-to-br from-pink-100 to-purple-200 rounded-full flex flex-col items-center justify-center p-8 text-center shadow-xl">
             <Heart size={80} className="text-pink-400 drop-shadow-lg" />
             <p className="mt-4 text-xl font-semibold text-purple-700">Will you find your match?</p>
             <p className="text-sm text-purple-500">10 contestants are waiting...</p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <User size={32} className="text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">1. Create Your Profile</h3>
            <p className="text-gray-600">Introduce yourself to the contestants. Your age, occupation, and interests will all influence their first impression.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-green-100 p-4 rounded-full mb-4">
              <Award size={32} className="text-green-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">2. Take the Quiz</h3>
            <p className="text-gray-600">Test your Chinese skills with a quick HSK-based quiz. A good score will impress the contestants and keep their lights on!</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <MessageCircle size={32} className="text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">3. Meet the Contestants</h3>
            <p className="text-gray-600">Chat with the AI-powered contestants, learn about their personalities, and see if you can win them over before the final choice.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
