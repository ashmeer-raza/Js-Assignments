import React, { useState, useMemo } from 'react';
import { Plus } from 'lucide-react';
import ProblemList from '../../features/problems/components/ProblemList';
import ProblemFilters from '../../features/problems/components/ProblemFilters';
import AddProblemModal from '../../features/problems/components/AddProblemModal';
import { useLocalStorage } from '../../hooks/useLocalStorage';

const TOPICS = ['Arrays & Hashing', 'Two Pointers', 'Trees & Graphs', 'Dynamic Programming', 'System Design'];

const initialProblems = [
  { id: '1', name: 'Contains Duplicate', topic: 'Arrays & Hashing', difficulty: 'Easy', slug: 'contains-duplicate', status: 'completed' },
  { id: '2', name: 'Longest Substring Without Repeating Characters', topic: 'Two Pointers', difficulty: 'Medium', slug: 'longest-substring-without-repeating-characters', status: 'completed' },
  { id: '3', name: 'Validate Binary Search Tree', topic: 'Trees & Graphs', difficulty: 'Medium', slug: 'validate-binary-search-tree', status: 'todo' },
  { id: '4', name: 'Word Ladder II', topic: 'Trees & Graphs', difficulty: 'Hard', slug: 'word-ladder-ii', status: 'todo' },
  { id: '5', name: 'Coin Change', topic: 'Dynamic Programming', difficulty: 'Medium', slug: 'coin-change', status: 'completed' }
];

export default function ProblemBank() {
  const [problems, setProblems] = useLocalStorage('problem-bank-v2', initialProblems);
  const [search, setSearch] = useState('');
  const [filterTopic, setFilterTopic] = useState('All');
  const [filterDifficulty, setFilterDifficulty] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleStatus = (id) => {
    setProblems(problems.map(p => 
      p.id === id ? { ...p, status: p.status === 'completed' ? 'todo' : 'completed' } : p
    ));
  };

  const handleAddProblem = (newProblem) => {
    setProblems([newProblem, ...problems]);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedProblems = useMemo(() => {
    // 1. Filter
    let filtered = problems.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchTopic = filterTopic === 'All' || p.topic === filterTopic;
      const matchDiff = filterDifficulty === 'All' || p.difficulty === filterDifficulty;
      const matchStatus = filterStatus === 'All' || p.status === filterStatus;
      return matchSearch && matchTopic && matchDiff && matchStatus;
    });

    // 2. Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return filtered;
  }, [problems, search, filterTopic, filterDifficulty, filterStatus, sortConfig]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">Problem Bank</h1>
          <p className="text-slate-500 mt-1">Explore categorized practice problems. Filter, track status, and jump straight to coding.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors shadow-sm font-medium"
          >
            <Plus size={18} /> Custom Problem
          </button>
        </div>
      </div>

      <ProblemFilters 
        search={search} setSearch={setSearch}
        filterTopic={filterTopic} setFilterTopic={setFilterTopic}
        filterDifficulty={filterDifficulty} setFilterDifficulty={setFilterDifficulty}
        filterStatus={filterStatus} setFilterStatus={setFilterStatus}
        topics={TOPICS}
      />

      <ProblemList 
        problems={filteredAndSortedProblems} 
        onToggleStatus={handleToggleStatus}
        onSort={handleSort}
        sortConfig={sortConfig}
      />

      <AddProblemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddProblem}
        topics={TOPICS}
      />
    </div>
  );
}
