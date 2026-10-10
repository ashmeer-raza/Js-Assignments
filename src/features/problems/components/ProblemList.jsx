import { CheckCircle2, Circle } from 'lucide-react';

function ExternalLinkIcon(props) {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>;
}

export default function ProblemList({ problems, onToggleStatus, onSort, sortConfig }) {
  const handleRedirect = (slug) => {
    // Generate a slug if it doesn't exist to simulate Leetcode
    const problemSlug = slug || 'two-sum'; 
    window.open(`http://leetcode.com/problems/${problemSlug}`, '_blank');
  };

  const renderSortArrow = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    }
    return '';
  };

  if (problems.length === 0) {
    return (
      <div className="bg-white p-8 text-center rounded-xl shadow-sm border border-slate-100">
        <p className="text-slate-500 font-medium">No problems found matching your criteria.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
              <th className="px-6 py-4 w-12 text-center cursor-pointer select-none" onClick={() => onSort('status')}>
                Status{renderSortArrow('status')}
              </th>
              <th className="px-6 py-4 cursor-pointer select-none" onClick={() => onSort('name')}>
                Problem Name{renderSortArrow('name')}
              </th>
              <th className="px-6 py-4 cursor-pointer select-none" onClick={() => onSort('topic')}>
                Topic{renderSortArrow('topic')}
              </th>
              <th className="px-6 py-4 text-center cursor-pointer select-none" onClick={() => onSort('difficulty')}>
                Difficulty{renderSortArrow('difficulty')}
              </th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {problems.map((p) => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors group">
                <td className="px-6 py-4 text-center cursor-pointer" onClick={() => onToggleStatus(p.id)}>
                  {p.status === 'completed' ? (
                    <CheckCircle2 size={20} className="text-emerald-500 mx-auto" />
                  ) : (
                    <Circle size={20} className="text-slate-300 mx-auto group-hover:text-slate-400" />
                  )}
                </td>
                <td className="px-6 py-4">
                  <div 
                    onClick={() => handleRedirect(p.slug)}
                    className="font-semibold text-slate-800 flex items-center gap-1.5 hover:text-indigo-600 cursor-pointer"
                  >
                    {p.name} <ExternalLinkIcon size={14} className="text-slate-400" />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-indigo-600 font-medium text-sm">{p.topic}</span>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${p.difficulty === 'Easy' ? 'bg-emerald-100 text-emerald-700' : p.difficulty === 'Medium' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                    {p.difficulty}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleRedirect(p.slug)} className="text-indigo-600 font-semibold text-sm hover:text-indigo-800 transition-colors">
                    Solve
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
