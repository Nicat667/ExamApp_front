// src/pages/Exam/ExamInterface.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ExamInterface = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { subject, duration } = location.state || { subject: { name: "Test" }, duration: 30 };
  
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [marked, setMarked] = useState([]);
  const [answers, setAnswers] = useState({});
  const [jumpTo, setJumpTo] = useState("");
  const [filterMarked, setFilterMarked] = useState(false);

  const questions = [
    { id: 1, text: "What is 2 + 2?", options: ["3", "4", "5", "6"] },
    { id: 2, text: "What is the capital of France?", options: ["Berlin", "London", "Paris", "Madrid"] },
    { id: 3, text: "Which language runs in the browser?", options: ["Java", "C++", "JavaScript", "Python"] },
    { id: 4, text: "What is the boiling point of water?", options: ["90°C", "100°C", "120°C", "80°C"] },
    { id: 5, text: "Who wrote Hamlet?", options: ["Shakespeare", "Hemingway", "Tolkien", "Austen"] },
  ];

  const visibleIndices = filterMarked ? marked.sort((a, b) => a - b) : questions.map((_, i) => i);
  const currentVisibleIndex = visibleIndices.indexOf(currentIdx);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(timer);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s) => `${Math.floor(s / 60)}:${s % 60 < 10 ? '0' : ''}${s % 60}`;

  const toggleMark = () => {
    if (marked.includes(currentIdx)) {
      setMarked(marked.filter(i => i !== currentIdx));
      if (filterMarked && marked.length === 1) setFilterMarked(false);
    } else {
      setMarked([...marked, currentIdx]);
    }
  };

  const handleOptionSelect = (option) => {
    setAnswers({ ...answers, [currentIdx]: option });
  };

  const finishExam = () => {
    console.log("User Answers:", answers);
    alert("Exam Submitted!");
    navigate('/dashboard'); 
  };

  const handleJump = (e) => {
    e.preventDefault();
    const qNum = parseInt(jumpTo);
    if (qNum >= 1 && qNum <= questions.length) {
      setCurrentIdx(qNum - 1);
      setFilterMarked(false);
      setJumpTo(""); 
    } else {
      alert(`Please enter a number between 1 and ${questions.length}`);
    }
  };

  const navigateQuestion = (direction) => {
    if (currentVisibleIndex === -1) return;
    const nextVisibleIndex = currentVisibleIndex + direction;
    if (nextVisibleIndex >= 0 && nextVisibleIndex < visibleIndices.length) {
      setCurrentIdx(visibleIndices[nextVisibleIndex]);
    }
  };

  const toggleFilterMode = () => {
    if (!filterMarked && marked.length === 0) {
      alert("No marked questions to review!");
      return;
    }
    setFilterMarked(!filterMarked);
    if (!filterMarked && marked.length > 0) {
      setCurrentIdx(marked.sort((a, b) => a - b)[0]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-6 shadow-md rounded-2xl mb-6 sticky top-4 z-20 border border-gray-100">
        <div>
          <h2 className="font-extrabold text-2xl text-gray-800">{subject.name}</h2>
          <p className="text-gray-500 text-sm mt-1">Final Examination</p>
        </div>
        <div className={`px-6 py-2 rounded-xl font-mono font-bold text-2xl shadow-inner border
          ${timeLeft < 60 ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Question Area */}
        <div className={`lg:col-span-3 bg-white p-8 rounded-3xl shadow-lg border transition-colors duration-300 min-h-[500px]
          ${filterMarked ? 'border-amber-400 ring-4 ring-amber-50' : 'border-gray-100'}`}>
          
          {filterMarked && (
            <div className="bg-amber-100 text-amber-800 px-4 py-2 mb-6 rounded-lg text-center font-bold text-sm flex items-center justify-center gap-2">
              <span>⚠️</span> REVIEW MODE: Showing {marked.length} Marked Questions Only
            </div>
          )}

          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100">
            <h3 className="text-2xl font-bold text-gray-700">
              Question {currentIdx + 1} 
              <span className="text-gray-400 text-lg ml-2 font-medium">
                {filterMarked ? `(Marked ${currentVisibleIndex + 1} of ${marked.length})` : `/ ${questions.length}`}
              </span>
            </h3>
            
            <button 
              onClick={toggleMark} 
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300
              ${marked.includes(currentIdx) 
                ? 'bg-amber-100 text-amber-700 border-amber-300 shadow-sm' 
                : 'text-gray-400 border-gray-200 hover:bg-gray-50 hover:text-gray-600'}`}
            >
              {marked.includes(currentIdx) ? '★ Marked' : '☆ Mark for later'}
            </button>
          </div>

          <p className="mb-10 text-xl font-medium text-gray-800 leading-relaxed">{questions[currentIdx].text}</p>
          
          <div className="space-y-4">
            {questions[currentIdx].options.map((opt, i) => (
              <label key={i} className={`flex items-center p-5 border-2 rounded-xl cursor-pointer transition-all duration-200 group
                ${answers[currentIdx] === opt 
                  ? 'bg-emerald-50 border-emerald-500 shadow-md' 
                  : 'border-gray-100 hover:border-emerald-200 hover:bg-gray-50'}`}>
                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
                  ${answers[currentIdx] === opt ? 'border-emerald-500' : 'border-gray-300 group-hover:border-emerald-400'}`}>
                  {answers[currentIdx] === opt && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                </div>
                <span className={`text-lg ${answers[currentIdx] === opt ? 'text-emerald-900 font-semibold' : 'text-gray-600'}`}>{opt}</span>
              </label>
            ))}
          </div>
          
          <div className="flex justify-between mt-12 pt-8 border-t border-gray-100">
            <button 
              disabled={currentVisibleIndex === 0} 
              onClick={() => navigateQuestion(-1)} 
              className="px-8 py-3 bg-gray-100 text-gray-600 font-bold rounded-xl hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Back
            </button>
            
            <button 
              disabled={currentVisibleIndex === visibleIndices.length - 1} 
              onClick={() => navigateQuestion(1)} 
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition transform active:scale-95"
            >
              Next Question
            </button>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 h-fit space-y-8">
          
          {/* 1. FILTER TOGGLE */}
          <button 
            onClick={toggleFilterMode}
            className={`w-full py-4 rounded-xl font-bold border-2 transition-all duration-300
              ${filterMarked 
                ? 'bg-amber-50 border-amber-400 text-amber-700 shadow-inner' 
                : 'bg-white border-gray-200 text-gray-600 hover:border-amber-300 hover:text-amber-600 hover:shadow-md'}`}
          >
            {filterMarked ? 'Exit Review Mode' : `Review Marked (${marked.length})`}
          </button>

          {/* 2. JUMP TO */}
          <div className="bg-gray-50 p-4 rounded-xl">
            <label className="block text-xs font-bold text-gray-400 uppercase mb-2 tracking-wider">Jump to Question</label>
            <form onSubmit={handleJump} className="flex gap-2">
              <input 
                type="number" 
                min="1" 
                max={questions.length}
                value={jumpTo}
                onChange={(e) => setJumpTo(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-center"
                placeholder="#"
              />
              <button type="submit" className="bg-gray-800 text-white px-4 rounded-lg font-bold hover:bg-black transition">
                Go
              </button>
            </form>
          </div>

          {/* 3. STATS */}
          <div className="space-y-4">
             <div className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition">
              <span className="text-gray-500 text-sm font-medium">Total</span>
              <span className="font-bold text-gray-800">{questions.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-50 border border-emerald-100">
              <span className="text-emerald-700 text-sm font-medium">Answered</span>
              <span className="font-bold text-emerald-700">{Object.keys(answers).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-amber-50 border border-amber-100">
              <span className="text-amber-700 text-sm font-medium">Marked</span>
              <span className="font-bold text-amber-700">{marked.length}</span>
            </div>
          </div>

          <button 
            onClick={finishExam} 
            className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:from-red-600 hover:to-rose-700 shadow-lg transition-transform active:scale-[0.98]"
          >
            Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;