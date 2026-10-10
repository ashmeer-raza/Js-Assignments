import { Search, FilterX } from 'lucide-react';

export default function FilterBar({
  search, setSearch,
  filterCategory, setFilterCategory,
  filterDifficulty, setFilterDifficulty,
  filterStatus, setFilterStatus,
  categories, difficulties, statuses
}) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex flex-col md:flex-row gap-4">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input 
          type="text" 
          placeholder="Search questions..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
        <select value={filterCategory} onChange={e => setFilterCategory(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
          <option value="All">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={filterDifficulty} onChange={e => setFilterDifficulty(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
          <option value="All">All Difficulties</option>
          {difficulties.map(d => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
          <option value="All">All Statuses</option>
          {statuses.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        {(search || filterCategory !== 'All' || filterDifficulty !== 'All' || filterStatus !== 'All') && (
          <button 
            onClick={() => { setSearch(''); setFilterCategory('All'); setFilterDifficulty('All'); setFilterStatus('All'); }}
            className="flex items-center gap-1 text-slate-500 hover:text-slate-800 px-3 py-2 text-sm"
          >
            <FilterX size={16} /> Reset
          </button>
        )}
      </div>
    </div>
  );
}
