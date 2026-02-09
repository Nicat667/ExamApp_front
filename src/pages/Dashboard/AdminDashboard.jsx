import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Settings, 
  LogOut, 
  Search, 
  Edit, 
  Trash2, 
  Plus, 
  Activity,
  Shield,
  Menu,
  X,
  UploadCloud,
  Save,
  List
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null); 

  // --- MOCK DATA ---
  const stats = [
    { label: 'Total Students', value: '1,240', change: '+12%', icon: Users, color: 'blue' },
    { label: 'Active Exams', value: '34', change: '+2', icon: FileText, color: 'emerald' },
    { label: 'Server Load', value: '24%', change: '-5%', icon: Activity, color: 'purple' },
    { label: 'Pending Requests', value: '8', change: 'Urgent', icon: Shield, color: 'amber' },
  ];

  const recentUsers = [
    { id: 1, name: "Ali Valiyev", email: "ali@example.com", role: "Student", status: "Active" },
    { id: 2, name: "Ayan Mammadova", email: "ayan@example.com", role: "Student", status: "Pending" },
    { id: 3, name: "Rashad Huseynov", email: "rashad@example.com", role: "Student", status: "Banned" },
  ];

  const allExams = [
    { id: 101, title: "Calculus Midterm", code: "MTH101", type: "PDF", downloads: 45, status: "Published" },
    { id: 102, title: "Physics Final", code: "PHY202", type: "PDF", downloads: 12, status: "Draft" },
    { id: 103, title: "Computer Science Basics", code: "CS101", type: "PDF", downloads: 89, status: "Published" },
  ];

  // Filter exams based on search query
  const filteredExams = allExams.filter(exam => 
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    exam.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const openModal = (exam = null) => {
    setEditingExam(exam);
    setIsModalOpen(true);
  };

  const NavItem = ({ id, label, icon: Icon }) => (
    <button
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); }}
      className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-0
      ${activeTab === id
          ? 'bg-white/10 text-white shadow-lg font-bold' 
          : 'text-emerald-100 hover:bg-white/5 hover:text-white font-medium'
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="fixed top-[64px] left-0 right-0 bottom-0 flex bg-gray-50 dark:bg-gray-900 font-sans overflow-hidden z-0">

      {/* --- MOBILE OVERLAY --- */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
        />
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`
          fixed inset-y-0 left-0 z-[70] h-screen w-72 shadow-2xl
          lg:static lg:z-auto lg:h-full lg:shadow-none
          bg-gradient-to-b from-emerald-900 to-teal-800 dark:from-gray-950 dark:to-emerald-950 text-white
          flex flex-col shrink-0 
          transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* LOGO AREA: Applied the Mobile Top Margin Fix Here */}
        <div className="p-8 shrink-0 flex justify-between items-start lg:items-center border-b border-white/10">
          <div className="mt-[76px] lg:mt-0">
            <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
              <Shield className="w-8 h-8 text-emerald-300" />
              <span>Admin</span>
            </h1>
            <p className="text-emerald-200 text-xs mt-1 font-mono tracking-widest uppercase">Control Panel v2.0</p>
          </div>
          
          {/* Close Button: Applied Mobile Top Margin Fix Here */}
          <button 
            onClick={() => setIsSidebarOpen(false)} 
            className="lg:hidden mt-[70px] p-2 hover:bg-white/10 rounded-full focus:outline-none"
          >
            <X className="w-6 h-6 text-emerald-100" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <NavItem id="dashboard" label="Overview" icon={LayoutDashboard} />
          <NavItem id="users" label="User Management" icon={Users} />
          <NavItem id="exams" label="Exam Repository" icon={FileText} />
          <NavItem id="settings" label="System Settings" icon={Settings} />
        </nav>

        <div className="p-6 bg-black/20 border-t border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-bold text-white shadow-lg">A</div>
            <div className="min-w-0 flex-1">
              <p className="font-bold text-sm truncate">Administrator</p>
              <p className="text-[11px] text-emerald-300 font-mono">Super User</p>
            </div>
            <button onClick={handleLogout} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Logout">
              <LogOut className="w-4 h-4 text-emerald-200" />
            </button>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 h-full overflow-y-auto p-4 md:p-10 relative custom-scrollbar bg-slate-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto pb-20">

          {/* Header */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-200 rounded-lg focus:outline-none">
                <Menu className="w-8 h-8" />
              </button>
              <div>
                <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white capitalize">
                  {activeTab.replace('-', ' ')}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
            </div>
          </div>

          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-start">
                      <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600`}>
                        <stat.icon className="w-6 h-6" />
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{stat.change}</span>
                    </div>
                    <h3 className="text-3xl font-extrabold text-slate-800 dark:text-white mt-4">{stat.value}</h3>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              
              <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700">
                <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Recent Registrations</h3>
                <div className="space-y-6">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold">{user.name.charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                      <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 uppercase">{user.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EXAMS (Repository) */}
          {activeTab === 'exams' && (
            <div className="space-y-6 animate-fade-in-up">
              
              {/* Toolbar */}
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-center">
                {/* Search Bar */}
                <div className="relative w-full md:w-[500px] flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                    <input 
                      type="text" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search exams by title or code..." 
                      className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium" 
                    />
                  </div>
                  {/* Optional Search Button (Purely visual as filtering is real-time) */}
                  <button className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-slate-700 transition-colors">
                    Search
                  </button>
                </div>
                
                {/* Create New Button (ONLY VISIBLE IN EXAM REPOSITORY) */}
                <button 
                  onClick={() => openModal()}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700 transition-transform hover:scale-105 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                  <span className="hidden md:inline">Create New Exam</span>
                </button>
              </div>

              {/* Exam List Table */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      {['ID', 'Title', 'Code', 'Status', 'Actions'].map(h => <th key={h} className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredExams.length > 0 ? (
                      filteredExams.map((exam) => (
                        <tr key={exam.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/30 transition-colors">
                          <td className="px-6 py-4 font-mono text-xs text-slate-400">#{exam.id}</td>
                          <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">{exam.title}</td>
                          <td className="px-6 py-4 text-sm text-slate-500">{exam.code}</td>
                          <td className="px-6 py-4"><span className="text-[10px] font-black px-2 py-1 rounded bg-emerald-100 text-emerald-700 uppercase">{exam.status}</span></td>
                          <td className="px-6 py-4 flex gap-2">
                            <button onClick={() => openModal(exam)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Edit className="w-4 h-4"/></button>
                            <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-8 text-center text-slate-400 italic">No exams found matching "{searchQuery}"</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: PLACEHOLDERS */}
          {(activeTab === 'users' || activeTab === 'settings') && (
            <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
              <div className="p-6 bg-slate-50 dark:bg-gray-700 rounded-full mb-4 text-slate-300">
                {activeTab === 'users' ? <Users className="w-16 h-16"/> : <Settings className="w-16 h-16"/>}
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Module Under Construction</h3>
              <p className="text-slate-500 mt-2">The {activeTab} module will be available in the next sprint.</p>
            </div>
          )}
        </div>
      </main>

      {/* --- CREATE/EDIT EXAM MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-fade-in-up">
            <div className="px-8 py-6 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">
                {editingExam ? 'Edit Exam' : 'Create New Exam'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"><X className="w-5 h-5 text-gray-500"/></button>
            </div>
            
            <div className="p-8 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject Name</label>
                <input type="text" defaultValue={editingExam?.title} placeholder="e.g. Advanced Calculus" className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject Code</label>
                <input type="text" defaultValue={editingExam?.code} placeholder="e.g. MTH101" className="w-full p-3 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-emerald-500 outline-none" />
              </div>
              
              {/* CONDITIONAL RENDERING FOR EDIT vs CREATE */}
              {editingExam ? (
                /* EDIT MODE: Show "Edit Questions" button instead of Upload */
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Questions Configuration</label>
                  <button className="w-full py-4 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-center gap-2">
                    <List className="w-5 h-5" />
                    Edit Exam Questions
                  </button>
                  <p className="text-xs text-slate-400 mt-2 text-center">Click to modify questions parsed from the original PDF.</p>
                </div>
              ) : (
                /* CREATE MODE: Show PDF Upload */
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Upload PDF Question Paper</label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:border-emerald-500 hover:text-emerald-500 transition-colors cursor-pointer bg-gray-50 dark:bg-gray-700/30">
                    <UploadCloud className="w-10 h-10 mb-2" />
                    <span className="text-sm font-medium">Click to upload or drag & drop</span>
                    <span className="text-xs mt-1">PDF files only (max 10MB)</span>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-700/50">
              <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 font-bold text-slate-500 hover:text-slate-700">Cancel</button>
              <button className="px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow-lg flex items-center gap-2">
                <Save className="w-4 h-4" /> Save Exam
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;