import React from 'react';
import { Trash2, Edit2, Search } from 'lucide-react';

export default function QuestionTable({ questions, onEdit, onDelete, hasFilters }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-amber-100 text-amber-700 border-amber-200';
    }
  };

  const getDifficultyColor = (diff) => {
    switch(diff) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  if (questions.length === 0) {
    return (
      <div className="py-16 px-6 text-center">
        <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Search size={24} />
        </div>
        <h3 className="text-lg font-medium text-slate-800 mb-1">No questions found</h3>
        <p className="text-slate-500 max-w-sm mx-auto">
          {!hasFilters 
            ? "You haven't added any questions yet. Get started by adding your first interview question!" 
            : "No questions match your current filters. Try adjusting your search or filters."}
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
            <th className="px-6 py-4">Question Title</th>
            <th className="px-6 py-4">Category</th>
            <th className="px-6 py-4">Difficulty</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {questions.map(q => (
            <tr key={q.id} className="hover:bg-slate-50/50 transition-colors group">
              <td className="px-6 py-4">
                <span className="font-medium text-slate-800">{q.title}</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md">{q.category}</span>
              </td>
              <td className="px-6 py-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${getDifficultyColor(q.difficulty)}`}>
                  {q.difficulty}
                </span>
              </td>
              <td className="px-6 py-4">
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border flex items-center gap-1.5 w-fit ${getStatusColor(q.status)}`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${q.status === 'Completed' ? 'bg-emerald-500' : q.status === 'In Progress' ? 'bg-blue-500' : 'bg-amber-500'}`}></span>
                  {q.status}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => onEdit(q)} className="p-1.5 text-slate-400 hover:text-indigo-600 rounded-md hover:bg-indigo-50 transition-colors cursor-pointer">
                    <Edit2 size={16} />
                  </button>
                  <button onClick={() => onDelete(q.id)} className="p-1.5 text-slate-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer">
                    <Trash2 size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
