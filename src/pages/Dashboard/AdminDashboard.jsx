import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Settings, 
  LogOut, 
  Search, 
  Edit, 
  Trash2, 
  Plus, 
  Shield,
  Menu,
  X,
  UploadCloud,
  Save,
  List,
  GraduationCap,
  UserCheck,
  Layers,
  Mail,
  Send,
  ChevronDown
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// --- CUSTOM DROPDOWN COMPONENT (Fixes the ugly native <select> menus) ---
const CustomDropdown = ({ value, options, onChange, theme = 'emerald', padding = 'p-3' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = options.find(o => o.value === value);

  // Theme maps to avoid Tailwind purger issues
  const themes = {
    emerald: {
      borderFocus: 'hover:border-emerald-400 dark:hover:border-emerald-500',
      bgActive: 'bg-emerald-50 dark:bg-emerald-900/30',
      textActive: 'text-emerald-700 dark:text-emerald-400',
      hover: 'hover:bg-emerald-50 dark:hover:bg-gray-700'
    },
    blue: {
      borderFocus: 'hover:border-blue-400 dark:hover:border-blue-500',
      bgActive: 'bg-blue-50 dark:bg-blue-900/30',
      textActive: 'text-blue-700 dark:text-blue-400',
      hover: 'hover:bg-blue-50 dark:hover:bg-gray-700'
    }
  };

  const currentTheme = themes[theme];

  return (
    <div className="relative">
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full ${padding} rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 flex justify-between items-center cursor-pointer bg-slate-50 dark:bg-gray-700 dark:text-white transition-colors ${currentTheme.borderFocus} shadow-sm`}
      >
        <span className="font-medium truncate pr-4">{selected?.label || 'Select...'}</span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)}></div>
          <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl shadow-xl z-20 overflow-hidden animate-fade-in-up">
            {options.map((opt) => {
              const isActive = value === opt.value;
              return (
                <div 
                  key={opt.value}
                  onClick={() => { onChange(opt.value); setIsOpen(false); }}
                  className={`${padding} cursor-pointer transition-colors ${isActive ? `${currentTheme.bgActive} font-bold ${currentTheme.textActive}` : `text-slate-700 dark:text-gray-300 ${currentTheme.hover}`}`}
                >
                  {opt.label}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  
  // Navigation & Layout State
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Exam Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState(null); 

  // Edit User Status Modal State
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingUserType, setEditingUserType] = useState('');
  
  // Email Form State
  const [emailData, setEmailData] = useState({ to: 'all', specificId: '', subject: '', message: '' });

  // --- STATE-MANAGED DATA ---
  const [students, setStudents] = useState([
    { id: 1, name: "Ali Valiyev", email: "ali@example.com", details: "Group CS-101", status: "Active" },
    { id: 2, name: "Ayan Mammadova", email: "ayan@example.com", details: "Group CS-102", status: "Active" },
    { id: 3, name: "Rashad Huseynov", email: "rashad@example.com", details: "Group ENG-202", status: "Banned" },
  ]);

  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. Ahmedov", email: "ahmedov@univ.edu", groupsCount: 3, studentsCount: 120, examsCount: 5, status: "Active" },
    { id: 2, name: "Prof. Hasanova", email: "hasanova@univ.edu", groupsCount: 2, studentsCount: 85, examsCount: 8, status: "Active" },
  ]);

  const [groups, setGroups] = useState([
    { id: 1, name: "CS-101", creator: "Dr. Ahmedov", details: "24 Students" },
    { id: 2, name: "ENG-202", creator: "Prof. Hasanova", details: "30 Students" },
  ]);

  const [exams, setExams] = useState([
    { id: 101, title: "Calculus Midterm", code: "MTH101", type: "PDF", downloads: 45 },
    { id: 102, title: "Physics Final", code: "PHY202", type: "PDF", downloads: 12 },
    { id: 103, title: "Computer Science Basics", code: "CS101", type: "PDF", downloads: 89 },
  ]);

  const stats = [
    { label: 'Total Students', value: students.length, change: '+12%', icon: GraduationCap, color: 'blue' },
    { label: 'Active Teachers', value: teachers.length, change: '+5', icon: UserCheck, color: 'purple' },
    { label: 'Active Exams', value: exams.length, change: '+2', icon: FileText, color: 'emerald' },
    { label: 'Active Groups', value: groups.length, change: 'Stable', icon: Layers, color: 'amber' },
  ];

  const recentUsers = students.slice(0, 3).map(s => ({ ...s, role: "Student" }));

  // --- SEARCH FILTER LOGIC ---
  const filterList = (list) => {
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase();
    return list.filter(item => 
      (item.name && item.name.toLowerCase().includes(query)) ||
      (item.email && item.email.toLowerCase().includes(query)) ||
      (item.details && item.details.toLowerCase().includes(query)) ||
      (item.creator && item.creator.toLowerCase().includes(query))
    );
  };

  const filteredStudents = filterList(students);
  const filteredTeachers = filterList(teachers);
  const filteredGroups = filterList(groups);
  
  const filteredExams = exams.filter(exam => 
    exam.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    exam.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // --- ACTIONS ---
  const handleDelete = async (type, id) => {
    if (!window.confirm(`Are you sure you want to delete this item?`)) return;

    if (type === 'students') setStudents(prev => prev.filter(item => item.id !== id));
    if (type === 'teachers') setTeachers(prev => prev.filter(item => item.id !== id));
    if (type === 'groups') setGroups(prev => prev.filter(item => item.id !== id));
    if (type === 'exams') setExams(prev => prev.filter(item => item.id !== id));

    try {
      // await api.delete(`/${type}/${id}`);
      console.log(`Successfully sent DELETE request for ${type} id: ${id}`);
    } catch (error) {
      console.error(`Failed to delete ${type} on backend`, error);
      alert("Failed to delete on server. Please refresh.");
    }
  };

  const openEditUserModal = (user, type) => {
    setEditingUser(user);
    setEditingUserType(type);
    setIsEditUserModalOpen(true);
  };

  const handleEditUserSubmit = (e) => {
    e.preventDefault();
    if (editingUserType === 'students') {
      setStudents(students.map(s => s.id === editingUser.id ? editingUser : s));
    } else if (editingUserType === 'teachers') {
      setTeachers(teachers.map(t => t.id === editingUser.id ? editingUser : t));
    }
    setIsEditUserModalOpen(false);
  };

  const handleSendEmail = async (e) => {
    e.preventDefault();
    try {
      // await api.post('/email/send', emailData);
      console.log("Email Payload Sent:", emailData);
      alert("Emails have been queued for sending!");
      setEmailData({ to: 'all', specificId: '', subject: '', message: '' });
    } catch (error) {
      console.error("Failed to send email", error);
    }
  };

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
      onClick={() => { setActiveTab(id); setIsSidebarOpen(false); setSearchQuery(''); }}
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

      {isSidebarOpen && (
        <div onClick={() => setIsSidebarOpen(false)} className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"/>
      )}

      {/* --- SIDEBAR --- */}
      <aside className={`fixed inset-y-0 left-0 z-[70] h-screen w-72 shadow-2xl lg:static lg:z-auto lg:h-full lg:shadow-none bg-gradient-to-b from-emerald-900 to-teal-800 dark:from-gray-950 dark:to-emerald-950 text-white flex flex-col shrink-0 transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="p-8 shrink-0 flex justify-between items-start lg:items-center border-b border-white/10">
          <div className="mt-[76px] lg:mt-0">
            <h1 className="text-2xl font-extrabold tracking-wide flex items-center gap-2">
              <Shield className="w-8 h-8 text-emerald-300" />
              <span>Admin</span>
            </h1>
            <p className="text-emerald-200 text-xs mt-1 font-mono tracking-widest uppercase">Control Panel v2.0</p>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden mt-[70px] p-2 hover:bg-white/10 rounded-full focus:outline-none">
            <X className="w-6 h-6 text-emerald-100" />
          </button>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto custom-scrollbar">
          <NavItem id="dashboard" label="Overview" icon={LayoutDashboard} />
          <NavItem id="teachers" label="Teachers" icon={UserCheck} />
          <NavItem id="students" label="Students" icon={GraduationCap} />
          <NavItem id="groups" label="Groups" icon={Layers} />
          <NavItem id="exams" label="Exam Repository" icon={FileText} />
          <NavItem id="email" label="Email & Comms" icon={Mail} />
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
                <h2 className="text-3xl font-extrabold text-slate-800 dark:text-white capitalize">{activeTab.replace('-', ' ')}</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
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
                      <div className={`p-3 rounded-xl bg-${stat.color}-50 dark:bg-${stat.color}-900/20 text-${stat.color}-600`}><stat.icon className="w-6 h-6" /></div>
                      <span className={`px-2 py-1 rounded-full text-xs font-bold ${stat.change.includes('+') ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{stat.change}</span>
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
                      <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold">{user.name.charAt(0)}</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-slate-800 dark:text-white truncate">{user.name}</p>
                        <p className="text-xs text-slate-500 truncate">{user.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* SHARED TABS FOR STUDENTS, TEACHERS, GROUPS */}
          {['students', 'teachers', 'groups'].includes(activeTab) && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="relative w-full md:w-[400px]">
                  <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                  <input 
                    type="text" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={`Search ${activeTab}...`} 
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" 
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden overflow-x-auto">
                <table className="w-full text-left min-w-[700px]">
                  <thead className="bg-slate-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">ID</th>
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Name</th>
                      {activeTab === 'teachers' && (
                        <>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Email</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Stats</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                        </>
                      )}
                      {activeTab === 'students' && (
                        <>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Email</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Group</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Status</th>
                        </>
                      )}
                      {activeTab === 'groups' && (
                        <>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Creator</th>
                          <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Details</th>
                        </>
                      )}
                      <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {(activeTab === 'students' ? filteredStudents : activeTab === 'teachers' ? filteredTeachers : filteredGroups).map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/30 transition-colors">
                        
                        <td className="px-6 py-4 font-mono text-xs text-slate-400">#{item.id}</td>

                        <td className="px-6 py-4">
                          {['students', 'teachers'].includes(activeTab) ? (
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-xs shrink-0">
                                {item.name.charAt(0)}
                              </div>
                              <span className="font-bold text-slate-800 dark:text-white">{item.name}</span>
                            </div>
                          ) : (
                            <span className="font-bold text-slate-800 dark:text-white">{item.name}</span>
                          )}
                        </td>
                        
                        {activeTab === 'students' && (
                           <>
                             <td className="px-6 py-4 text-sm text-slate-500">{item.email}</td>
                             <td className="px-6 py-4 text-sm text-slate-500 font-mono bg-slate-50 dark:bg-gray-800/50 rounded">{item.details}</td>
                             <td className="px-6 py-4">
                               <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                 {item.status}
                               </span>
                             </td>
                           </>
                        )}
                        
                        {activeTab === 'teachers' && (
                           <>
                             <td className="px-6 py-4 text-sm text-slate-500">{item.email}</td>
                             <td className="px-6 py-4 align-top">
                               <div className="text-xs text-slate-500 flex flex-col gap-1">
                                 <span><span className="font-bold text-slate-700 dark:text-slate-300">{item.groupsCount}</span> Groups</span>
                                 <span><span className="font-bold text-slate-700 dark:text-slate-300">{item.studentsCount}</span> Students</span>
                                 <span><span className="font-bold text-emerald-600 dark:text-emerald-400">{item.examsCount}</span> Exams</span>
                               </div>
                             </td>
                             <td className="px-6 py-4 align-top">
                               <span className={`text-[10px] font-black px-2 py-1 rounded uppercase ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                 {item.status}
                               </span>
                             </td>
                           </>
                        )}

                        {activeTab === 'groups' && (
                           <>
                             <td className="px-6 py-4 text-sm text-blue-600 dark:text-blue-400 font-medium">{item.creator}</td>
                             <td className="px-6 py-4 text-sm text-slate-500">{item.details}</td>
                           </>
                        )}

                        <td className="px-6 py-4 align-top">
                          <div className="flex gap-2">
                            {['students', 'teachers'].includes(activeTab) && (
                              <button onClick={() => openEditUserModal(item, activeTab)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                <Edit className="w-4 h-4"/>
                              </button>
                            )}
                            <button onClick={() => handleDelete(activeTab, item.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"><Trash2 className="w-4 h-4"/></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: EXAMS */}
          {activeTab === 'exams' && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row gap-4 justify-between items-center">
                <div className="relative w-full md:w-[500px] flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-3 text-slate-400 w-5 h-5" />
                    <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="Search exams by title or code..." className="w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none font-medium" />
                  </div>
                </div>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-3 rounded-xl font-bold shadow-lg hover:bg-emerald-700">
                  <Plus className="w-5 h-5" /> <span className="hidden md:inline">Create New Exam</span>
                </button>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-gray-700/50 border-b border-gray-100 dark:border-gray-700">
                    <tr>
                      {['ID', 'Title', 'Code', 'Actions'].map(h => <th key={h} className="px-6 py-4 text-xs font-bold text-slate-400 uppercase">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                    {filteredExams.map((exam) => (
                      <tr key={exam.id} className="hover:bg-slate-50/50 dark:hover:bg-gray-700/30">
                        <td className="px-6 py-4 font-mono text-xs text-slate-400">#{exam.id}</td>
                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">{exam.title}</td>
                        <td className="px-6 py-4 text-sm text-slate-500">{exam.code}</td>
                        <td className="px-6 py-4 flex gap-2">
                          <button onClick={() => openModal(exam)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"><Edit className="w-4 h-4"/></button>
                          <button onClick={() => handleDelete('exams', exam.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4"/></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB: EMAIL & COMMUNICATIONS */}
          {activeTab === 'email' && (
             <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-700 animate-fade-in-up max-w-3xl">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-3">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl text-blue-600"><Mail className="w-6 h-6"/></div>
                Send Communication
              </h3>
              
              <form onSubmit={handleSendEmail} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Recipients</label>
                  <CustomDropdown 
                    value={emailData.to}
                    theme="blue"
                    padding="p-4"
                    options={[
                      { value: 'all', label: 'Everybody (System Wide)' },
                      { value: 'teachers', label: 'All Teachers' },
                      { value: 'students', label: 'All Students' },
                      { value: 'specific', label: 'Specific User (by ID or Email)' }
                    ]}
                    onChange={(val) => setEmailData({...emailData, to: val})}
                  />
                </div>

                {emailData.to === 'specific' && (
                  <div className="animate-fade-in-up">
                     <label className="block text-xs font-bold text-slate-500 uppercase mb-2">User Email or ID</label>
                     <input required type="text" onChange={(e) => setEmailData({...emailData, specificId: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:text-white transition-all shadow-sm hover:shadow-md" />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Subject</label>
                  <input required type="text" value={emailData.subject} onChange={(e) => setEmailData({...emailData, subject: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50 dark:text-white transition-all shadow-sm hover:shadow-md" />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Message Body</label>
                  <textarea required rows="6" value={emailData.message} onChange={(e) => setEmailData({...emailData, message: e.target.value})} className="w-full p-4 rounded-xl border border-gray-200 dark:border-gray-600 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none custom-scrollbar bg-slate-50 dark:text-white transition-all shadow-sm hover:shadow-md"></textarea>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
                  <button type="submit" className="px-8 py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 shadow-lg flex items-center gap-2 transition-transform hover:-translate-y-1"><Send className="w-5 h-5"/> Dispatch Email</button>
                </div>
              </form>
            </div>
          )}

          {/* TAB: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="flex flex-col items-center justify-center h-96 bg-white dark:bg-gray-800 rounded-3xl border border-dashed border-gray-200 dark:border-gray-700">
              <div className="p-6 bg-slate-50 dark:bg-gray-700 rounded-full mb-4 text-slate-300"><Settings className="w-16 h-16"/></div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Module Under Construction</h3>
            </div>
          )}
        </div>
      </main>

      {/* --- EDIT USER STATUS MODAL --- */}
      {isEditUserModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsEditUserModalOpen(false)}></div>
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-sm relative z-10 overflow-hidden animate-fade-in-up">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-700/50">
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                Edit User Status
              </h3>
              <button onClick={() => setIsEditUserModalOpen(false)} className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full"><X className="w-5 h-5 text-gray-500"/></button>
            </div>
            
            <form onSubmit={handleEditUserSubmit}>
              <div className="p-6 space-y-4">
                <div>
                  <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100 dark:border-gray-700">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 font-bold text-sm shrink-0">
                      {editingUser?.name?.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800 dark:text-white">{editingUser?.name}</p>
                      <p className="text-xs text-slate-500">{editingUser?.email}</p>
                    </div>
                  </div>
                  
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Account Status</label>
                  <CustomDropdown 
                    value={editingUser?.status || 'Active'}
                    theme="emerald"
                    padding="p-3"
                    options={[
                      { value: 'Active', label: 'Active' },
                      { value: 'Banned', label: 'Banned' }
                    ]}
                    onChange={(val) => setEditingUser({...editingUser, status: val})}
                  />
                </div>
              </div>
              <div className="p-5 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3 bg-gray-50 dark:bg-gray-700/50">
                <button type="button" onClick={() => setIsEditUserModalOpen(false)} className="px-4 py-2 font-bold text-slate-500 hover:text-slate-700">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 shadow flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
              
              {editingExam ? (
                <div className="pt-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Questions Configuration</label>
                  <button className="w-full py-4 border-2 border-emerald-500 text-emerald-600 dark:text-emerald-400 font-bold rounded-xl hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors flex items-center justify-center gap-2">
                    <List className="w-5 h-5" />
                    Edit Exam Questions
                  </button>
                </div>
              ) : (
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