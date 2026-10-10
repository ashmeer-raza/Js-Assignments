import { useAuth } from '../../context/AuthContext';
import StatsGrid from '../../features/analytics/components/StatsGrid';
import GoalProgress from '../../features/analytics/components/GoalProgress';

export default function Analytics() {
  const { user } = useAuth();
  const firstName = user?.name?.split(' ')[0] || 'Friend';

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-300">
      
      {/* Friendly Greeting Header */}
      <div className="bg-indigo-600 rounded-3xl p-8 sm:p-10 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-3">You're doing great, {firstName}!</h1>
          <p className="text-indigo-100 text-lg max-w-xl">
            Consistency is key. You've been maintaining a solid pace this week. Keep tackling those problems and you'll be interview-ready in no time!
          </p>
        </div>
        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute bottom-0 left-1/4 w-32 h-32 bg-indigo-400/30 rounded-full blur-2xl translate-y-1/2"></div>
      </div>

      <StatsGrid totalSolved={48} avgTime={22} />

      <GoalProgress progress={64} completed={48} total={75} />

      {/* Next Steps / Friendly Advice */}
      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8 text-center space-y-4">
        <h3 className="text-lg font-bold text-slate-800">Friendly Advice</h3>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Your Data Structures knowledge is looking incredibly solid! Try focusing your next few sessions on <strong>Dynamic Programming</strong> to balance out your skill tree.
        </p>
      </div>

    </div>
  );
}
