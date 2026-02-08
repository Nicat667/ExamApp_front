// src/pages/Exam/ExamSetup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Sliders, Clock, BookOpen } from 'lucide-react'; 

const ExamSetup = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [duration, setDuration] = useState(30);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [questionCount, setQuestionCount] = useState(20);
  const [range, setRange] = useState({ from: 1, to: 100 });

  const subjects = [
    { id: 1, name: "Mathematics 101", code: "MTH101", totalQuestions: 500 },
    { id: 2, name: "Computer Science", code: "CS101", totalQuestions: 300 },
    { id: 3, name: "History of Art", code: "ART200", totalQuestions: 150 },
    { id: 4, name: "Physics II", code: "PHY102", totalQuestions: 400 },
    { id: 5, name: "Chemistry Lab", code: "CHM300", totalQuestions: 200 },
    { id: 6, name: "English Literature", code: "ENG101", totalQuestions: 250 }
  ];

  const filteredSubjects = subjects.filter(sub => 
    sub.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sub.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStart = () => {
    if (selectedSubject) {
      navigate('/exam/live', { 
        state: { 
          subject: selectedSubject, 
          duration: duration,
          config: { count: questionCount, range: range }
        } 
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8 min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h1 className="text-4xl font-extrabold mb-2 text-gray-800 dark:text-white tracking-tight">Setup Examination</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">Select a subject and configure your timer.</p>
      
      {/* 1. SEARCH BAR & GRID */}
      <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 mb-8 transition-colors">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-emerald-600" /> 1. Choose Subject
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search by subject name or code..." 
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-600 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-50 dark:focus:ring-emerald-900/20 outline-none transition-all text-gray-700 dark:text-white bg-gray-50 dark:bg-gray-700 hover:bg-white dark:hover:bg-gray-600"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedSubject(null);
            }}
          />
        </div>

        {/* Filtered Grid */}
        {filteredSubjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredSubjects.map(sub => (
              <div key={sub.id} 
                  onClick={() => setSelectedSubject(sub)}
                  className={`relative p-5 rounded-2xl cursor-pointer transition-all duration-200 border-2 group
                  ${selectedSubject?.id === sub.id 
                    ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-500 shadow-md ring-2 ring-emerald-100 dark:ring-emerald-900/40' 
                    : 'bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 hover:shadow-lg hover:-translate-y-1'}`}>
                
                <div className={`absolute top-4 right-4 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors
                  ${selectedSubject?.id === sub.id ? 'border-emerald-500' : 'border-gray-200 dark:border-gray-600 group-hover:border-emerald-300'}`}>
                  {selectedSubject?.id === sub.id && <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full" />}
                </div>

                <h3 className={`font-bold text-lg mb-1 pr-6 ${selectedSubject?.id === sub.id ? 'text-emerald-900 dark:text-emerald-400' : 'text-gray-800 dark:text-gray-200'}`}>
                  {sub.name}
                </h3>
                <span className={`text-xs font-mono font-bold px-2 py-1 rounded-md 
                  ${selectedSubject?.id === sub.id ? 'bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200' : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                  {sub.code}
                </span>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{sub.totalQuestions} Questions Available</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 text-gray-400 dark:text-gray-600">
            <p>No subjects found for "{searchTerm}"</p>
          </div>
        )}
      </div>
      
      {/* 2. Configuration Section */}
      {selectedSubject && (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 animate-fade-in-up transition-colors">
          <h2 className="text-lg font-bold text-gray-700 dark:text-gray-200 uppercase tracking-wider mb-6 flex items-center gap-2">
            <Sliders className="w-5 h-5 text-emerald-600" /> 2. Configure Exam
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            
            {/* Left Column: Duration */}
            <div>
              <label className="block text-gray-500 dark:text-gray-400 font-bold mb-4 text-sm uppercase flex items-center gap-2">
                <Clock className="w-4 h-4" /> Select Duration
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[30, 60, 100].map((min) => (
                  <button
                    key={min}
                    onClick={() => setDuration(min)}
                    className={`py-3 rounded-xl font-bold transition-all duration-200 border-2
                      ${duration === min 
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                        : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700 hover:border-emerald-200 dark:hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400'}`}
                  >
                    {min} <span className="text-xs font-normal opacity-80">min</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Right Column: Question Settings */}
            <div>
              <label className="block text-gray-500 dark:text-gray-400 font-bold mb-4 text-sm uppercase">Question Count</label>
              <div className="grid grid-cols-4 gap-2 mb-6">
                {[10, 20, 50, 100].map((count) => (
                  <button
                    key={count}
                    onClick={() => setQuestionCount(count)}
                    className={`py-2 rounded-lg font-bold text-sm transition-all border
                      ${questionCount === count 
                        ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700' 
                        : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-600'}`}
                  >
                    {count}
                  </button>
                ))}
              </div>

              <label className="block text-gray-500 dark:text-gray-400 font-bold mb-2 text-sm uppercase">Question Interval (Range)</label>
              <div className="flex items-center gap-3">
                <div className="relative w-full">
                  <span className="absolute left-3 top-2.5 text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">FROM</span>
                  <input 
                    type="number" 
                    value={range.from}
                    onChange={(e) => setRange({...range, from: e.target.value})}
                    className="w-full pl-12 pr-3 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold transition-colors"
                  />
                </div>
                <span className="text-gray-400 dark:text-gray-600 font-bold">-</span>
                <div className="relative w-full">
                  <span className="absolute left-3 top-2.5 text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">TO</span>
                  <input 
                    type="number" 
                    value={range.to}
                    onChange={(e) => setRange({...range, to: e.target.value})}
                    className="w-full pl-8 pr-3 py-2 border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none font-bold transition-colors"
                  />
                </div>
              </div>
            </div>

          </div>

          {/* Summary Footer */}
          <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl mb-6 transition-colors">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-sm text-2xl transition-colors">⚡</div>
              <div>
                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Config Summary</span>
                <div className="font-bold text-gray-800 dark:text-gray-200 text-sm">
                  {questionCount} Questions <span className="text-gray-400 dark:text-gray-600 mx-1">|</span> Range {range.from}-{range.to}
                </div>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">Total Time</span>
              <div className="font-bold text-lg text-emerald-600 dark:text-emerald-400">{duration} Minutes</div>
            </div>
          </div>

          <button 
            onClick={handleStart} 
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300"
          >
            Start Exam Now
          </button>
        </div>
      )}
    </div>
  );
};

export default ExamSetup;