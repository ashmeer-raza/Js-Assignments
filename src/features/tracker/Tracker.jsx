import { useState, useMemo } from 'react';
import { Plus, Check, Clock, CircleAlert } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import StatCard from './components/StatCard';
import FilterBar from './components/FilterBar';
import QuestionTable from './components/QuestionTable';
import QuestionModal from './components/QuestionModal';

const CATEGORIES = ['DSA', 'Git', 'Technical', 'Machine Coding'];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];

const initialQuestions = [
  { id: '1', title: 'Reverse Linked List', category: 'DSA', difficulty: 'Easy', status: 'Completed', addedAt: new Date().toISOString() },
  { id: '2', title: 'Design Rate Limiter', category: 'Technical', difficulty: 'Hard', status: 'In Progress', addedAt: new Date().toISOString() },
  { id: '3', title: 'Git Rebase vs Merge', category: 'Git', difficulty: 'Medium', status: 'Pending', addedAt: new Date().toISOString() },
];

export default function Tracker() {
  const [questions, setQuestions] = useLocalStorage('interview-questions-v2', initialQuestions);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);

  // Stats
  const totalQuestions = questions.length;
  const completedQuestions = questions.filter(q => q.status === 'Completed').length;
  const dsaCompleted = questions.filter(q => q.category === 'DSA' && q.status === 'Completed').length;
  const technicalCompleted = questions.filter(q => q.category === 'Technical' && q.status === 'Completed').length;
  const machineCodingCount = questions.filter(q => q.category === 'Machine Coding').length;
  
  const progressPercentage = totalQuestions === 0 ? 0 : Math.round((completedQuestions / totalQuestions) * 100);

  const filteredQuestions = useMemo(() => {
    return questions.filter(q => {
      const matchSearch = q.title.toLowerCase().includes(search.toLowerCase());
      const matchCat = filterCategory === 'All' || q.category === filterCategory;
      const matchDiff = filterDifficulty === 'All' || q.difficulty === filterDifficulty;
      const matchStatus = filterStatus === 'All' || q.status === filterStatus;
      return matchSearch && matchCat && matchDiff && matchStatus;
    });
  }, [questions, search, filterCategory, filterDifficulty, filterStatus]);

  const hasFilters = search || filterCategory !== 'All' || filterDifficulty !== 'All' || filterStatus !== 'All';

  const handleSave = (formData) => {
    if (editingQuestion) {
      setQuestions(questions.map(q => q.id === editingQuestion.id ? { ...q, ...formData } : q));
    } else {
      setQuestions([{ ...formData, id: Date.now().toString(), addedAt: new Date().toISOString() }, ...questions]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
  };

  const openEditModal = (q) => {
    setEditingQuestion(q);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingQuestion(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8 animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-indigo-950">Interview Practice Tracker</h1>
            <p className="text-slate-500 mt-1">Track and master your technical interview preparations.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 transition-colors shadow-sm cursor-pointer"
          >
            <Plus size={20} /> Add Question
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Total Questions" value={totalQuestions} icon={<CircleAlert size={20} />} />
          <StatCard title="Completed (All)" value={completedQuestions} icon={<Check size={20} className="text-emerald-500" />} />
          <StatCard title="DSA Completed" value={dsaCompleted} icon={<Clock size={20} className="text-blue-500" />} />
          <StatCard title="Tech/Machine Coding" value={technicalCompleted + machineCodingCount} icon={<Check size={20} className="text-purple-500" />} />
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="font-semibold text-slate-800">Overall Progress</h3>
              <p className="text-sm text-slate-500">{completedQuestions} of {totalQuestions} completed</p>
            </div>
            <span className="text-2xl font-bold text-indigo-600">{progressPercentage}%</span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-indigo-600 h-3 rounded-full transition-all duration-500 ease-out" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Search & Filters */}
        <FilterBar 
          search={search} setSearch={setSearch}
          filterCategory={filterCategory} setFilterCategory={setFilterCategory}
          filterDifficulty={filterDifficulty} setFilterDifficulty={setFilterDifficulty}
          filterStatus={filterStatus} setFilterStatus={setFilterStatus}
          categories={CATEGORIES} difficulties={DIFFICULTIES} statuses={STATUSES}
        />

        {/* Questions Table */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
          <QuestionTable 
            questions={filteredQuestions} 
            onEdit={openEditModal} 
            onDelete={handleDelete}
            hasFilters={hasFilters}
          />
        </div>
      </div>

      {/* Modal */}
      <QuestionModal 
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={handleSave}
        editingQuestion={editingQuestion}
        categories={CATEGORIES}
        difficulties={DIFFICULTIES}
        statuses={STATUSES}
      />
    </div>
  );
}
