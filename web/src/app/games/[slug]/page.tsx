import Link from 'next/link';
import { ArrowLeft, Star, Play, Maximize2 } from 'lucide-react';

interface GamePageProps {
  params: {
    slug: string;
  };
}

export default function GameRunnerPage({ params }: GamePageProps) {
  const { slug } = params;
  const title = slug.replace(/-/g, ' ').toUpperCase();

  // Permitted sample HTML5 iframe embed
  const gameUrl = 'https://html5.gamedistribution.com/rvvASndrUmg0M2p3c09jN2VpL0x1UT00/';

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Link href="/games" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Games Portal
      </Link>

      <div className="glass-panel rounded-3xl p-6 space-y-4 border border-slate-800">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">{title}</h1>
            <p className="text-xs text-slate-400">HTML5 Verified Game Session</p>
          </div>
          <span className="text-xs text-amber-400 font-bold flex items-center gap-1">
            <Star className="w-4 h-4 fill-amber-400" /> 4.85 Rating
          </span>
        </div>

        {/* GAME IFRAME PLAYER */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800">
          <iframe
            src={gameUrl}
            className="w-full h-full border-0"
            allowFullScreen
            title={title}
          />
        </div>
      </div>

      {/* COMPLIANT ADSENSE DISPLAY AD BELOW GAME */}
      <div className="ad-container">
        <span>Natural Transition Advertisement — Google AdSense Approved Placement</span>
      </div>
    </div>
  );
}
