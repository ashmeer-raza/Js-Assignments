import { Target } from 'lucide-react';

export default function GoalProgress({ progress, completed, total }) {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-100 shadow-sm">
      <div className="flex items-start gap-4 mb-6">
        <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
          <Target size={24} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-800">Fall Target Goal</h2>
          <p className="text-slate-500 mt-1">You're aiming to complete {total} core problems before November.</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-3xl font-black text-indigo-600">{progress}%</span>
          <span className="text-sm font-medium text-slate-500">{completed} of {total} completed</span>
        </div>
        <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
          <div className="bg-indigo-600 h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}
