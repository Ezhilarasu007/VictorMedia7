import Link from 'next/link';
import { Trophy, Flame, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Daily Tech Quiz & Leaderboard | VictorMedia',
  description: 'Test your daily technical knowledge across Web Security, Programming, AI, and Networking.',
};

export default function QuizzesPage() {
  const quizzes = [
    { title: 'Daily Web Architecture & Security Quiz', slug: 'daily-web-architecture-quiz', category: 'Web & Security', qCount: 5, difficulty: 'Medium', isDaily: true },
    { title: 'Python & Data Structures Assessment', slug: 'python-data-structures', category: 'Programming', qCount: 10, difficulty: 'Hard', isDaily: false },
    { title: 'AI & Prompt Engineering Basics', slug: 'ai-prompt-engineering', category: 'AI', qCount: 8, difficulty: 'Easy', isDaily: false },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Daily Quiz Engine</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">VictorMedia Daily Quizzes</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Challenge your engineering skills daily. Correct answers earn knowledge points, build streak counters, and rank on global leaderboards.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {quizzes.map((quiz) => (
          <div key={quiz.slug} className="glass-panel rounded-2xl p-6 space-y-4 border border-slate-800 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-[10px] font-bold uppercase">{quiz.category}</span>
                {quiz.isDaily && (
                  <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[10px] font-bold flex items-center gap-1">
                    <Flame className="w-3 h-3" /> DAILY
                  </span>
                )}
              </div>
              <h3 className="font-bold text-white text-lg">{quiz.title}</h3>
              <p className="text-slate-400 text-xs">{quiz.qCount} Multiple Choice Questions • {quiz.difficulty} Level</p>
            </div>
            <Link
              href={`/quizzes/${quiz.slug}`}
              className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold text-center block transition-all shadow-md shadow-amber-600/20"
            >
              Start Quiz Challenge
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
