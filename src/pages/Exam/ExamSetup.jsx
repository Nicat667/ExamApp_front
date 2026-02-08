// src/pages/Exam/ExamSetup.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ExamSetup = () => {
  const navigate = useNavigate();
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [duration, setDuration] = useState(30);
  
  const subjects = [
    { id: 1, name: "Mathematics 101", code: "MTH101" },
    { id: 2, name: "Computer Science", code: "CS101" },
    { id: 3, name: "History of Art", code: "ART200" }
  ];

  const handleStart = () => {
    if (selectedSubject) {
      navigate('/exam/live', { state: { subject: selectedSubject, duration: duration } });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h1 className="text-4xl font-extrabold mb-8 text-gray-800 tracking-tight">Setup Examination</h1>
      
      {/* 1. Subject Grid */}
      <h2 className="text-lg font-semibold text-gray-600 mb-4 uppercase tracking-wider">1. Choose Subject</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {subjects.map(sub => (
          <div key={sub.id} 
               onClick={() => setSelectedSubject(sub)}
               className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2
               ${selectedSubject?.id === sub.id 
                 ? 'bg-emerald-50 border-emerald-500 shadow-lg scale-[1.02]' 
                 : 'bg-white border-transparent shadow-sm hover:shadow-md hover:border-gray-200'}`}>
            <h3 className={`font-bold text-xl mb-1 ${selectedSubject?.id === sub.id ? 'text-emerald-800' : 'text-gray-800'}`}>
              {sub.name}
            </h3>
            <p className="text-gray-400 font-mono text-sm">{sub.code}</p>
          </div>
        ))}
      </div>
      
      {/* 2. Configuration Section */}
      {selectedSubject && (
        <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animation-slide-up">
          <h2 className="text-lg font-semibold text-gray-600 mb-6 uppercase tracking-wider">2. Configure Exam</h2>
          
          {/* Duration Selector */}
          <div className="mb-8">
            <label className="block text-gray-800 font-bold mb-4 text-lg">Select Duration</label>
            <div className="flex gap-4">
              {[30, 60, 100].map((min) => (
                <button
                  key={min}
                  onClick={() => setDuration(min)}
                  className={`px-8 py-4 rounded-xl font-bold transition-all duration-300 border-2
                    ${duration === min 
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-emerald-200 shadow-lg' 
                      : 'bg-white text-gray-600 border-gray-200 hover:border-emerald-300 hover:text-emerald-600'}`}
                >
                  {min} Minutes
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl mb-8 flex justify-between items-center border border-gray-200">
            <div>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Subject</span>
              <div className="font-bold text-xl text-gray-800">{selectedSubject.name}</div>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Time Limit</span>
              <div className="font-bold text-xl text-emerald-600">{duration} Minutes</div>
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