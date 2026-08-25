import Link from 'next/link';
import { Gamepad2, Star, Play, ShieldAlert } from 'lucide-react';

export const metadata = {
  title: 'HTML5 Games Directory | VictorMedia',
  description: 'Play safe, non-pirated HTML5 web games across Arcade, Puzzle, and Strategy categories.',
};

export default function GamesDirectoryPage() {
  const games = [
    {
      title: 'Cyber Runner 2099',
      slug: 'cyber-runner-2099',
      category: 'Arcade',
      rating: '4.85',
      plays: '1,240',
      desc: 'High-speed HTML5 endless runner game on a neon cyberpunk digital grid.',
    },
    {
      title: 'Quantum Sudoku',
      slug: 'quantum-sudoku',
      category: 'Puzzle',
      rating: '4.90',
      plays: '890',
      desc: 'Daily analytical puzzle grid challenge with custom difficulty scaling.',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-xs font-semibold">
          <Gamepad2 className="w-3.5 h-3.5" />
          <span>Verified HTML5 Web Games</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">VictorMedia Arcade</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Legitimate HTML5 web games distributed with full permission. Play instantly in your browser without downloads or install requirements.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <div key={game.slug} className="glass-card rounded-2xl p-6 space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase">{game.category}</span>
                <span className="text-xs text-amber-400 flex items-center gap-1 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" /> {game.rating} ({game.plays} plays)
                </span>
              </div>
              <h3 className="font-bold text-white text-xl group-hover:text-indigo-400 transition-colors">{game.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{game.desc}</p>
            </div>
            <Link
              href={`/games/${game.slug}`}
              className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-600/20"
            >
              <Play className="w-4 h-4 fill-white" /> Launch Game
            </Link>
          </div>
        ))}
      </div>

      <div className="ad-container">
        <span>Advertisement Placeholder — Google AdSense Approved Placement</span>
      </div>
    </div>
  );
}
