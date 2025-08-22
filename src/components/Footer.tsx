import React from 'react';
import { Github, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 mt-auto">
      <div className="container mx-auto py-8 px-4 text-center">
        <div className="mb-4">
          <p className="text-lg font-semibold">Built with <Heart className="inline-block text-pink-500 h-5 w-5 mx-1" /> by a solo developer.</p>
          <p className="text-sm text-gray-400 mt-2 max-w-2xl mx-auto">
            This is a passion project created for fun, learning, and to explore the amazing capabilities of AI. Please don't take it too seriously – just enjoy the ride, practice your Chinese, and may you always keep your light on! 😉
          </p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <a 
            href="https://github.com/your-username/your-repo" // <-- IMPORTANT: Add your GitHub repo link here!
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <Github size={20} />
            View on GitHub
          </a>
        </div>
        <div className="mt-6 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Fei Cheng Wu Rao Simulator. All Rights Reserved (sort of).</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;