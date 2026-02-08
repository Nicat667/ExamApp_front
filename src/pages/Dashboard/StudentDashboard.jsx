import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, BookOpen, History, Award, Clock, ChevronRight, Search } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = { examsTaken: 12, averageScore: 85, passed: 10, failed: 2 };
  
  const examHistory = [
    { id: 101, subject: "Mathematics 101", date: "2023-10-15", score: 92, status: "Passed" },
    { id: 102, subject: "Physics II", date: "2023-10-12", score: 45, status: "Failed" },
  ];

  const availableExams = [
    { id: 1, name: "Mathematics 101", code: "MTH101", topic: "Calculus & Algebra" },
    { id: 2, name: "Computer Science", code: "CS101", topic: "Intro to Algorithms" },
    { id: 3, name: "Physics II", code: "PHY102", topic: "Thermodynamics" },
  ];

  return (
    /**
     * THE FIX: 
     * 1. h-[calc(100vh-64px)] -> Subtracts Navbar height so nothing is hidden.
     * 2. overflow-hidden -> Prevents the whole page from scrolling.
     */
    <div className="flex h-[calc(100vh-64px)] w-full bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans overflow-hidden">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-72 h-full bg-gradient-to-b from-emerald-900 to-teal-800 dark:from-gray-950 dark:to-emerald-950 text-white flex flex-col shadow-2xl shrink-0 z-30">
        
        {/* Logo Area (Fixed height) */}
        <div className="p-8 border-b border-white/10 shrink-0">
          <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-3">
            <span className="text-3xl">🎓</span> ExamPortal
          </h1>
          <p className="text-emerald-200 text-xs mt-1 font-medium tracking-wider uppercase">Student Panel</p>
        </div>

        {/* Navigation Area (Scrolls only if items exceed height) */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto custom-scrollbar">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200
            ${activeTab === 'overview' 
              ? 'bg-white/10 text-white shadow-lg border border-white/5' 
              : 'text-emerald-100 hover:bg-white/5 hover:text-white'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="font-bold tracking-wide">Dashboard</span>
            {activeTab === 'overview' && <ChevronRight className="w-4 h-4 ml-auto" />}
          </button>

          <button 
            onClick={() => setActiveTab('history')}
            className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-all duration-200
            ${activeTab === 'history' 
              ? 'bg-white/10 text-white shadow-lg border border-white/5' 
              : 'text-emerald-100 hover:bg-white/5 hover:text-white'}`}
          >
            <History className="w-5 h-5" />
            <span className="font-bold tracking-wide">My History</span>
            {activeTab === 'history' && <ChevronRight className="w-4 h-4 ml-auto" />}
          </button>
        </nav>

        {/* User Profile (Pinned to bottom) */}
        <div className="p-6 bg-black/20 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center font-bold text-emerald-900 shrink-0 shadow-lg">
              {user?.name?.charAt(0) || "S"}
            </div>
            <div className="min-w-0">
              <p className="font-bold text-sm truncate">{user?.name || "Student User"}</p>
              <p className="text-[11px] text-emerald-300 opacity-80 font-mono">ID: #883920</p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <main className="flex-1 h-full overflow-y-auto p-10 relative">
        <div className="max-w-6xl mx-auto">
          
          {/* Dashboard Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white transition-colors">
                {activeTab === 'overview' ? 'Dashboard Overview' : 'Examination History'}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mt-1 italic">
                Welcome back, {user?.name || 'Student'}!
              </p>
            </div>
            <button 
              onClick={() => navigate('/exam/setup')}
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 hover:scale-105 transition-all flex items-center gap-2"
            >
              <BookOpen className="w-5 h-5" /> Take New Exam
            </button>
          </div>

          {/* VIEW 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-10 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'Exams Taken', val: stats.examsTaken, icon: BookOpen, color: 'blue' },
                  { label: 'Avg. Score', val: `${stats.averageScore}%`, icon: Award, color: 'emerald' },
                  { label: 'Pass Rate', val: `${(stats.passed / stats.examsTaken * 100).toFixed(0)}%`, icon: History, color: 'purple' }
                ].map((s, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-4">
                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-emerald-600 dark:text-emerald-400">
                      <s.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <p className="text-gray-400 dark:text-gray-500 font-bold text-xs uppercase tracking-wider">{s.label}</p>
                      <p className="text-3xl font-extrabold text-gray-800 dark:text-white">{s.val}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Available Exams */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">Available Exams</h3>
                  <div className="relative">
                     <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />
                     <input 
                      type="text" 
                      placeholder="Search exams..." 
                      className="pl-9 pr-4 py-2 border dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg text-sm outline-none w-48 focus:w-64 transition-all" 
                     />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-10">
                  {availableExams.map((exam) => (
                    <div key={exam.id} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-emerald-500 transition-all group">
                      <div className="flex justify-between items-start mb-4">
                        <div className="w-10 h-10 bg-gray-50 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xl">📚</div>
                        <span className="bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-[10px] font-black px-2 py-1 rounded tracking-tighter uppercase">{exam.code}</span>
                      </div>
                      <h4 className="font-bold text-lg text-gray-800 dark:text-white mb-1">{exam.name}</h4>
                      <p className="text-sm text-gray-400 dark:text-gray-500 mb-6">{exam.topic}</p>
                      <button 
                        onClick={() => navigate('/exam/setup')}
                        className="w-full py-2 border-2 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-bold rounded-lg hover:border-emerald-500 hover:text-emerald-600 transition"
                      >
                        View Details
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIEW 2: HISTORY */}
          {activeTab === 'history' && (
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700/50">
                    <tr>
                      {['Subject', 'Date', 'Score', 'Status', 'Action'].map((h) => (
                        <th key={h} className="px-8 py-4 text-left text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {examHistory.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/50 transition">
                        <td className="px-8 py-5 font-bold text-gray-800 dark:text-white">{item.subject}</td>
                        <td className="px-8 py-5 text-sm text-gray-500 dark:text-gray-400">{item.date}</td>
                        <td className="px-8 py-5 font-bold text-emerald-600 dark:text-emerald-400">{item.score}/100</td>
                        <td className="px-8 py-5">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase
                            ${item.status === 'Passed' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                            {item.status}
                          </span>
                        </td>
                        <td className="px-8 py-5"><button className="text-emerald-600 font-bold text-sm">Review</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;