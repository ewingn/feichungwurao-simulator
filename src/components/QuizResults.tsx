import React from "react";

type Props = {
  quizScore: number;
  totalQuestions: number;
  playerLanguageAbility: string;
  handleProceedAfterQuiz: () => void;
  loading: boolean;
};

const QuizResults: React.FC<Props> = ({
  quizScore,
  totalQuestions,
  playerLanguageAbility,
  handleProceedAfterQuiz,
  loading,
}) => {
  const pct = totalQuestions ? Math.round((quizScore / totalQuestions) * 100) : 0;

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6 text-center">
      <h2 className="text-2xl font-bold mb-2">测验结果</h2>
      <p className="text-gray-700 mb-2">水平：{playerLanguageAbility}</p>
      <p className="text-xl font-semibold mb-4">
        得分：{quizScore}/{totalQuestions}（{pct}%）
      </p>
      <button onClick={handleProceedAfterQuiz} disabled={loading} className="rounded bg-blue-600 text-white px-4 py-2">
        继续
      </button>
    </div>
  );
};

export default QuizResults;
