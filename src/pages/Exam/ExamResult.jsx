// src/pages/Exam/ExamResult.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, LayoutDashboard } from 'lucide-react';

const ExamResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { questions, userAnswers, subject } = location.state || { questions: [], userAnswers: {}, subject: { name: "Unknown" } };

  let score = 0;
  questions.forEach((q, index) => {
    if (userAnswers[index] === q.options[0]) { 
      score++;
    }
  });

  const percentage = Math.round((score / questions.length) * 100) || 0;

  return (
    // FIXED: Added dark:bg-gray-900 and min-h-screen to cover the whole page
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8 font-sans transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        
        {/* Score Card */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 mb-8 text-center border border-gray-100 dark:border-gray-700 transition-colors">
          <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight">
            {subject.name} - Results
          </h1>
          <div className="flex justify-center items-center gap-4 my-6">
            <div className={`w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold border-4 transition-all
              ${percentage >= 50 
                ? 'border-emerald-500 text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 dark:text-emerald-400' 
                : 'border-red-500 text-red-600 bg-red-50 dark:bg-red-900/20 dark:text-red-400'}`}>
              {percentage}%
            </div>
          </div>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            You scored {score} out of {questions.length}
          </p>
        </div>

        {/* Detailed Review */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 mb-8 transition-colors">
          <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-6">Detailed Review</h2>
          <div className="space-y-6">
            {questions.map((q, index) => {
              const userAnswer = userAnswers[index];
              const correctAnswer = q.options[0]; 
              const isCorrect = userAnswer === correctAnswer;

              return (
                <div key={q.id} className={`p-5 rounded-2xl border-l-8 transition-all
                  ${isCorrect 
                    ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-900/10' 
                    : 'border-red-500 bg-red-50/50 dark:bg-red-900/10'}`}>
                  
                  <p className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-lg">
                    Q{index + 1}: {q.text}
                  </p>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                    <div className={`flex items-center gap-2 font-semibold
                      ${isCorrect ? 'text-emerald-700 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'}`}>
                      {isCorrect ? <CheckCircle className="w-5 h-5"/> : <XCircle className="w-5 h-5"/>}
                      <span>Your Answer: {userAnswer || "Skipped"}</span>
                    </div>
                    
                    {!isCorrect && (
                      <div className="text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 px-3 py-1 rounded-lg border dark:border-gray-600">
                        Correct Answer: <span className="font-bold text-emerald-600 dark:text-emerald-400">{correctAnswer}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* BUTTON TO DASHBOARD */}
        <button 
          onClick={() => navigate('/dashboard')}
          className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold text-xl shadow-lg hover:bg-emerald-700 flex items-center justify-center gap-3 transition-all transform active:scale-[0.98] hover:shadow-emerald-900/20"
        >
          <LayoutDashboard className="w-6 h-6" /> Return to Dashboard
        </button>

      </div>
    </div>
  );
};

export default ExamResult;