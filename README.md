@'
# FeiChengWuRao Simulator

An interactive **Fei Cheng Wu Rao (非诚勿扰) dating show simulator** built with **React + TypeScript + Tailwind CSS**.  
Create a player profile, take a quick **HSK-style Chinese quiz**, then chat with a panel of AI contestants.  
AI calls are mocked for now and can be swapped for **OpenAI** later.

## ✨ Features

- **Profile creation** (name, age, interests, photo upload)
- **Language quiz** (Beginner → Advanced HSK buckets)
- **Bot panel (10 contestants)** with light on/off status
- **Chat** with a selected contestant (Chinese responses)
- **Text-to-speech** (browser TTS fallback)
- **Audio recording** (frontend capture; STT integration stub)
- Clean routing + componentized architecture

## 🧱 Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- React Router DOM
- (Mock) AI service — ready to swap for OpenAI
- CRA (react-scripts)

## 📦 Project Structure

@'
# FeiChengWuRao Simulator

An interactive **Fei Cheng Wu Rao (非诚勿扰) dating show simulator** built with **React + TypeScript + Tailwind CSS**.  
Create a player profile, take a quick **HSK-style Chinese quiz**, then chat with a panel of AI contestants.  
AI calls are mocked for now and can be swapped for **OpenAI** later.

## ✨ Features

- **Profile creation** (name, age, interests, photo upload)
- **Language quiz** (Beginner → Advanced HSK buckets)
- **Bot panel (10 contestants)** with light on/off status
- **Chat** with a selected contestant (Chinese responses)
- **Text-to-speech** (browser TTS fallback)
- **Audio recording** (frontend capture; STT integration stub)
- Clean routing + componentized architecture

## 🧱 Tech Stack

- React 18 + TypeScript
- Tailwind CSS
- React Router DOM
- (Mock) AI service — ready to swap for OpenAI
- CRA (react-scripts)

## 📦 Project Structure

src/
├─ components/
│ ├─ ProfileCreation.tsx
│ ├─ LanguageQuiz.tsx
│ ├─ QuizResults.tsx
│ └─ GameArena.tsx
├─ pages/
│ ├─ Home.tsx
│ ├─ About.tsx
│ └─ Simulator.tsx
├─ routes/
│ └─ AppRoutes.tsx
├─ services/
│ └─ ai.ts # mock AI; replace with OpenAI
├─ data/
│ └─ hskQuizQuestions.ts
├─ utils/
│ └─ audio.ts # base64/PCM/WAV helpers
└─ types.ts

bash
Copy
Edit

## 🚀 Quick Start

```bash
# clone (or use your local folder)
git clone https://github.com/ewingn/feichungwurao-simulator
cd feichungwurao-simulator

# install deps
npm install

# start dev server
npm start
The app runs at http://localhost:3000 (or the next free port).

Windows: if something is already running on port 3000, press Y to use a new port
or kill it: npx kill-port 3000

🔧 Environment Variables
Create a local .env (not committed):

makefile
Copy
Edit
# React requires REACT_APP_ prefix
REACT_APP_OPENAI_API_KEY=
REACT_APP_FIREBASE_API_KEY=
You can then wire these in src/services/ai.ts (or create src/api/openai.ts) when you’re ready.

🧠 Where to Plug In OpenAI
Open src/services/ai.ts and replace the mock implementations:

generateBotProfile(gender, index) → image + short Chinese bio

chatWithBot(bot, userPrompt) → chat completion in Chinese

speak(text) → keep browser TTS, or switch to a TTS API and play via <audio>

Tip: keep responses concise and in Chinese for a more authentic show vibe.

📝 Available Scripts
bash
Copy
Edit
npm start           # run dev server
npm run build       # production build to /build
npm test            # (if you add tests)
npm run eject       # CRA eject (irreversible)
🛠 Troubleshooting
Tailwind styles not showing

Ensure tailwind.config.js has:
content: ["./src/**/*.{js,jsx,ts,tsx}"]

Ensure src/index.css starts with:

less
Copy
Edit
@tailwind base;
@tailwind components;
@tailwind utilities;
Port already in use: npx kill-port 3000 or start on a new port.

npm audit warnings: run npm audit fix first; avoid --force unless you accept potential breaking changes.

🗺️ Roadmap
Replace mock AI with OpenAI (chat, image, optional TTS)

Add scoring logic to influence light on/off decisions more realistically

Persist sessions (Firebase or local storage)

Mobile UI polish + accessibility pass

Deploy to GitHub Pages / Vercel

🧑‍💻 Contributing
PRs are welcome. Please:

Create a feature branch

Keep commits small and descriptive

Add screenshots/GIFs for UI changes when possible

📄 License
MIT
'@ | Set-Content README.md

yaml
Copy
Edit

---

### Then commit and push
```powershell
git add README.md
git commit -m "docs: add README"
git push -u origin main
