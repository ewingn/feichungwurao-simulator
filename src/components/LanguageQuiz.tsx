import React from "react";
import { QuizQuestion } from "../types";

type Props = {
  quizQuestions: QuizQuestion[];
  currentQuizQuestionIndex: number;
  selectedQuizAnswer: string | null;
  handleAnswerSelection: (opt: string) => void;
  handleNextQuizQuestion: () => void;
  loading: boolean;
};

const LanguageQuiz: React.FC<Props> = ({
  quizQuestions,
  currentQuizQuestionIndex,
  selectedQuizAnswer,
  handleAnswerSelection,
  handleNextQuizQuestion,
  loading,
}) => {
  const q = quizQuestions[currentQuizQuestionIndex];

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow p-6">
      <h2 className="text-2xl font-bold mb-4">中文测验</h2>
      <div className="text-sm text-gray-600 mb-2">
        题目 {currentQuizQuestionIndex + 1}/{quizQuestions.length}
      </div>
      <p className="mb-4">{q?.question}</p>
      <div className="grid gap-2">
        {q?.options.map((opt) => (
          <button
            key={opt}
            onClick={() => handleAnswerSelection(opt)}
            className={`text-left border rounded p-3 hover:bg-gray-50 ${selectedQuizAnswer === opt ? "border-blue-600" : "border-gray-200"}`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <button
          disabled={loading || !selectedQuizAnswer}
          onClick={handleNextQuizQuestion}
          className="rounded bg-blue-600 text-white px-4 py-2 disabled:opacity-50"
        >
          下一题
        </button>
      </div>
    </div>
  );
};

export default LanguageQuiz;
