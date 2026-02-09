import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
// IMPORTANT: Ensure these icons are imported to prevent "white screen" errors
import { Clock, Bookmark, ChevronLeft, ChevronRight, Send, Hash, AlertTriangle } from 'lucide-react';

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
    navigate('/exam/result', { 
      state: { questions, userAnswers: answers, subject } 
    }); 
  };

  const handleJump = (e) => {
    e.preventDefault();
    const qNum = parseInt(jumpTo);
    if (qNum >= 1 && qNum <= questions.length) {
      setCurrentIdx(qNum - 1);
      setFilterMarked(false);
      setJumpTo(""); 
    }
  };

  const navigateQuestion = (direction) => {
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 p-6 font-sans">
      {/* Header */}
      <div className="flex justify-between items-center bg-white dark:bg-gray-800 p-6 shadow-md rounded-2xl mb-6 sticky top-4 z-20 border border-gray-100 dark:border-gray-700">
        <div>
          <h2 className="font-extrabold text-2xl text-gray-800 dark:text-white transition-colors">{subject.name}</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 uppercase tracking-widest font-bold">Live Session</p>
        </div>
        <div className={`px-6 py-2 rounded-xl font-mono font-bold text-2xl shadow-inner border flex items-center gap-3 transition-all
          ${timeLeft < 60 
            ? 'bg-red-50 text-red-600 border-red-100 dark:bg-red-900/20 dark:text-red-400 dark:border-red-900/30' 
            : 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30'}`}>
          <Clock className="w-6 h-6" /> {formatTime(timeLeft)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Question Area */}
        <div className={`lg:col-span-3 bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-lg border transition-all duration-300 min-h-[500px]
          ${filterMarked ? 'border-amber-400 ring-4 ring-amber-50 dark:ring-amber-900/10' : 'border-gray-100 dark:border-gray-700'}`}>
          
          {filterMarked && (
            <div className="bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400 px-4 py-3 mb-8 rounded-xl text-center font-bold text-sm flex items-center justify-center gap-3 border border-amber-200 dark:border-amber-800">
              <AlertTriangle className="w-5 h-5" />  Marked Questions
            </div>
          )}

          <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-700 dark:text-gray-200">
              Question {currentIdx + 1} 
              <span className="text-gray-400 dark:text-gray-500 text-lg ml-2 font-medium italic">
                {filterMarked ? `(Marked ${currentVisibleIndex + 1} of ${marked.length})` : `of ${questions.length}`}
              </span>
            </h3>
            
            <button 
              onClick={toggleMark} 
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold border transition-all duration-300
              ${marked.includes(currentIdx) 
                ? 'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700 shadow-sm' 
                : 'text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 hover:text-gray-600 dark:hover:text-gray-300'}`}
            >
              <Bookmark className={`w-4 h-4 ${marked.includes(currentIdx) ? 'fill-current' : ''}`} />
              {marked.includes(currentIdx) }
            </button>
          </div>

          <p className="mb-10 text-xl font-medium text-gray-800 dark:text-gray-100 leading-relaxed">
            {questions[currentIdx].text}
          </p>
          
          <div className="space-y-4">
            {questions[currentIdx].options.map((opt, i) => (
              <label key={i} className={`flex items-center p-5 border-2 rounded-2xl cursor-pointer transition-all duration-200 group
                ${answers[currentIdx] === opt 
                  ? 'bg-emerald-50 border-emerald-500 shadow-md dark:bg-emerald-900/20 dark:border-emerald-500' 
                  : 'border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:bg-gray-50 dark:hover:bg-gray-700/50'}`}>
                
                <input 
                  type="radio" 
                  name={`question-${currentIdx}`} 
                  className="hidden" 
                  checked={answers[currentIdx] === opt} 
                  onChange={() => handleOptionSelect(opt)}
                />

                <div className={`w-6 h-6 rounded-full border-2 mr-4 flex items-center justify-center transition-colors
                  ${answers[currentIdx] === opt ? 'border-emerald-500' : 'border-gray-300 dark:border-gray-600 group-hover:border-emerald-400'}`}>
                  {answers[currentIdx] === opt && <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>}
                </div>
                <span className={`text-lg ${answers[currentIdx] === opt ? 'text-emerald-900 dark:text-emerald-300 font-semibold' : 'text-gray-600 dark:text-gray-400 transition-colors'}`}>
                  {opt}
                </span>
              </label>
            ))}
          </div>
          
          <div className="flex justify-between mt-12 pt-8 border-t border-gray-100 dark:border-gray-700">
            <button 
              disabled={currentVisibleIndex === 0} 
              onClick={() => navigateQuestion(-1)} 
              className="px-8 py-3 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-all flex items-center gap-2"
            >
              <ChevronLeft className="w-5 h-5" /> Back
            </button>
            
            <button 
              disabled={currentVisibleIndex === visibleIndices.length - 1} 
              onClick={() => navigateQuestion(1)} 
              className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg disabled:opacity-50 transition-all transform active:scale-95 flex items-center gap-2"
            >
              Next <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Sidebar Controls */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 h-fit space-y-8 transition-colors">
          
          <button 
            onClick={toggleFilterMode}
            className={`w-full py-4 rounded-xl font-bold border-2 transition-all duration-300
              ${filterMarked 
                ? 'bg-amber-50 border-amber-400 text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700 shadow-inner' 
                : 'bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:border-amber-300'}`}
          >
            {filterMarked ? 'Exit Marked Questions' : `Review Marked (${marked.length})`}
          </button>

          <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-2xl border dark:border-gray-700">
            <label className="block text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-3 tracking-widest flex items-center gap-2">
              <Hash className="w-3 h-3" /> Jump to Question
            </label>
            <form onSubmit={handleJump} className="flex gap-2">
              <input 
                type="number" 
                min="1" 
                max={questions.length}
                value={jumpTo}
                onChange={(e) => setJumpTo(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none font-bold text-center transition-all"
                placeholder="#"
              />
              <button type="submit" className="bg-gray-800 dark:bg-emerald-600 text-white px-4 rounded-lg font-bold hover:bg-black dark:hover:bg-emerald-700 transition-all">
                Go
              </button>
            </form>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-xl bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-100 dark:border-indigo-900/30">
              <span className="text-indigo-700 dark:text-indigo-400 text-sm font-bold uppercase tracking-tighter">Total</span>
              <span className="font-black text-indigo-700 dark:text-indigo-400 text-xl">{questions.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-900/30">
              <span className="text-emerald-700 dark:text-emerald-400 text-sm font-bold uppercase tracking-tighter">Answered</span>
              <span className="font-black text-emerald-700 dark:text-emerald-400 text-xl">{Object.keys(answers).length}</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-900/30">
              <span className="text-amber-700 dark:text-amber-400 text-sm font-bold uppercase tracking-tighter">Marked</span>
              <span className="font-black text-amber-700 dark:text-amber-400 text-xl">{marked.length}</span>
            </div>
          </div>

          <button 
            onClick={finishExam} 
            className="w-full bg-gradient-to-r from-red-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2"
          >
            <Send className="w-5 h-5" /> Submit Exam
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamInterface;