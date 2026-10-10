import { Trophy, Clock } from 'lucide-react';

export default function StatsGrid({ totalSolved, avgTime }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
        <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
          <Trophy size={28} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Solved</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-800">{totalSolved}</span>
            <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">+3 this week</span>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex items-center gap-5">
        <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shadow-inner">
          <Clock size={28} />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Avg Time per Problem</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-slate-800">{avgTime}</span>
            <span className="text-slate-600 font-medium">mins</span>
          </div>
        </div>
      </div>
    </div>
  );
}
