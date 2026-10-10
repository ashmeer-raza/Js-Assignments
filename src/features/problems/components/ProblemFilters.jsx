import { Search } from 'lucide-react';

export default function ProblemFilters({ 
  search, setSearch, 
  filterTopic, setFilterTopic, 
  filterDifficulty, setFilterDifficulty, 
  filterStatus, setFilterStatus,
  topics
}) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        <button 
          onClick={() => setFilterTopic('All')}
          className={`px-4 py-1.5 rounded-full whitespace-nowrap font-medium text-sm transition-colors border ${filterTopic === 'All' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'}`}
        >
          All Topics
        </button>
        {topics.map((topic) => (
          <button 
            key={topic}
            onClick={() => setFilterTopic(topic)}
            className={`px-4 py-1.5 rounded-full whitespace-nowrap font-medium text-sm transition-colors border ${filterTopic === topic ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:text-indigo-600'}`}
          >
            {topic}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search problem title..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500" 
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none"
          >
            <option value="All">All Difficulties</option>
            <option value="Easy">Easy</option>
            <option value="Medium">Medium</option>
            <option value="Hard">Hard</option>
          </select>
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm text-slate-600 focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="completed">Completed</option>
            <option value="todo">To Do</option>
          </select>
        </div>
      </div>
    </div>
  );
}
