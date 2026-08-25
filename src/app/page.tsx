import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  BookOpen, 
  BrainCircuit, 
  Wrench, 
  Gamepad2, 
  Flame, 
  Clock, 
  Trophy, 
  CheckCircle,
  FileText,
  Shield,
  Binary,
  Code,
  Terminal,
  Heart,
  QrCode,
  Send,
  Download,
  SearchCode
} from 'lucide-react';
import DonationModal from '@/components/DonationModal';

export default function HomePage() {
  const toolsList = [
    { title: 'Word Counter', desc: 'Count words & reading time.', href: '/tools/word-counter', icon: FileText, cat: 'Text' },
    { title: 'Character Counter', desc: 'Detailed character stats.', href: '/tools/character-counter', icon: FileText, cat: 'Text' },
    { title: 'JSON Formatter', desc: 'Beautify JSON structures.', href: '/tools/json-formatter', icon: Code, cat: 'Developer' },
    { title: 'JSON Validator', desc: 'Find syntax errors instantly.', href: '/tools/json-validator', icon: CheckCircle, cat: 'Developer' },
    { title: 'Base64 Tool', desc: 'Encode & decode UTF-8 text.', href: '/tools/base64-tool', icon: Binary, cat: 'Developer' },
    { title: 'Document Exporter', desc: 'Export notes to .txt & .md', href: '/tools/document-exporter', icon: Download, cat: 'Utility' },
    { title: 'Regex Evaluator', desc: 'Test regex pattern matches live.', href: '/tools/regex-tester', icon: SearchCode, cat: 'Developer' },
    { title: 'Password Gen', desc: 'Secure custom passwords.', href: '/tools/password-generator', icon: Shield, cat: 'Security' }
  ];

  return (
    <div className="space-y-16">
      {/* HERO SECTION WITH CLAYMORPHISM */}
      <section className="relative clay-panel p-8 md:p-14 overflow-hidden border border-slate-800/80 bg-gradient-to-br from-slate-900 via-[#0e1629] to-slate-950">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold clay-badge text-blue-400">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Next-Gen Claymorphic Engineering Platform</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
            Empowering Technology <span className="text-gradient">Innovators & Builders</span>
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            VictorMedia is your definitive destination for in-depth technical analysis, daily quizzes, verified developer utilities, HTML5 games, and server-side AI tools.
          </p>

          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/news"
              className="clay-button px-6 py-3.5 text-white font-bold text-sm shadow-lg flex items-center gap-2 transition-all"
            >
              <span>Explore Tech News</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/ai"
              className="clay-card px-6 py-3.5 hover:bg-purple-950/40 text-purple-300 font-bold text-sm flex items-center gap-2 transition-all border-purple-500/30"
            >
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Try AI Tools</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES & TRENDING */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Featured Content</h2>
          </div>
          <Link href="/articles" className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <span>View all articles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <article className="clay-card p-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold">Web Development</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 6 min read
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                <Link href="/articles/architecting-nextjs-14-enterprise">
                  Architecting Next.js 14 Web Applications for Enterprise Scale
                </Link>
              </h3>
              <p className="text-slate-400 text-sm line-clamp-3">
                Explore the modern App Router architecture, server components, edge caching, and scalable Supabase state management strategies for zero-latency web applications.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/60 mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>By VictorMedia Team</span>
              <span>Updated Today</span>
            </div>
          </article>

          <article className="clay-card p-6 flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs font-semibold">Artificial Intelligence</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> 8 min read
                </span>
              </div>
              <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                <Link href="/articles/llm-fine-tuning-vector-retrieval">
                  Understanding Large Language Model Fine-Tuning & Vector Retrieval
                </Link>
              </h3>
              <p className="text-slate-400 text-sm line-clamp-3">
                A comprehensive technical guide to Retrieval-Augmented Generation (RAG), vector databases (pgvector), and parameter-efficient fine-tuning (LoRA).
              </p>
            </div>
            <div className="pt-6 border-t border-slate-800/60 mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>By VictorMedia AI Lab</span>
              <span>Updated Today</span>
            </div>
          </article>
        </div>
      </section>

      {/* COMPLIANT ADSENSE DISPLAY PLACEHOLDER */}
      <div className="ad-container">
        <span>Advertisement Placeholder — Google AdSense Approved Placement</span>
      </div>

      {/* SUPPORT & DONATE CARD (UPI REAL MONEY RECEPTION) */}
      <section className="clay-panel p-8 border border-emerald-500/30 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-teal-950/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold">
            <Heart className="w-3.5 h-3.5 fill-emerald-300 animate-bounce" />
            <span>Direct Community Support</span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">Support VictorMedia Engineering</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Send real money contributions directly via UPI (<span className="font-mono text-emerald-400 font-bold">arasu9629hf@okhdfcbank</span>). Send ₹100, ₹500, ₹1000 or custom amounts instantly.
          </p>
        </div>
        <div className="flex items-center gap-4">
          <DonationModal />
        </div>
      </section>

      {/* DAILY QUIZ & LEARNING SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 clay-panel p-6 sm:p-8 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">Daily Tech Quiz Challenge</h3>
                <p className="text-xs text-slate-400">Build your daily streak and earn knowledge badges</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold">100 Points</span>
          </div>

          <div className="space-y-4">
            <p className="text-sm font-medium text-slate-200">
              Which HTTP header is specifically designed to mitigate Cross-Site Scripting (XSS) attacks by controlling resources loaded on a webpage?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs font-medium hover:border-blue-500 text-slate-300 transition-all">
                A. Strict-Transport-Security
              </button>
              <button className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs font-medium hover:border-blue-500 text-slate-300 transition-all">
                B. Content-Security-Policy
              </button>
              <button className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs font-medium hover:border-blue-500 text-slate-300 transition-all">
                C. X-Frame-Options
              </button>
              <button className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left text-xs font-medium hover:border-blue-500 text-slate-300 transition-all">
                D. Access-Control-Allow-Origin
              </button>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <Link href="/quizzes" className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-all">
              Take Full Quiz & Leaderboard
            </Link>
          </div>
        </div>

        {/* LEARNING TRACK HIGHLIGHT */}
        <div className="clay-panel p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Full-Stack Track</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              Step-by-step engineering courses covering PostgreSQL Row Level Security, Flutter state management, and edge caching.
            </p>
          </div>
          <Link href="/learning" className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-center text-xs font-semibold text-white transition-all">
            Browse Learning Tracks
          </Link>
        </div>
      </section>

      {/* DEVELOPER TOOLS DIRECTORY */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Wrench className="w-5 h-5 text-blue-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Free Developer Tools (18 Utilities)</h2>
          </div>
          <Link href="/tools" className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <span>Explore all 18 tools</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {toolsList.map((tool, idx) => {
            const Icon = tool.icon;
            return (
              <Link key={idx} href={tool.href} className="clay-card p-5 space-y-3 block group">
                <div className="flex items-center justify-between">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-slate-800 text-slate-400">{tool.cat}</span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">{tool.title}</h4>
                  <p className="text-slate-400 text-xs mt-1">{tool.desc}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HTML5 GAMES SECTION */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Gamepad2 className="w-5 h-5 text-indigo-400" />
            <h2 className="text-2xl font-bold text-white tracking-tight">Arcade & Puzzle Games</h2>
          </div>
          <Link href="/games" className="text-sm font-semibold text-blue-400 hover:text-blue-300 flex items-center gap-1">
            <span>Launch game portal</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/games/cyber-runner-2099" className="clay-card overflow-hidden group block">
            <div className="h-48 bg-gradient-to-r from-blue-900 to-indigo-900 relative flex items-center justify-center">
              <span className="text-2xl font-extrabold text-white tracking-widest uppercase opacity-80 group-hover:scale-110 transition-transform">Cyber Runner 2099</span>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-indigo-400 font-semibold">Arcade</span>
                <span>★ 4.85 (1,240 plays)</span>
              </div>
              <h4 className="font-bold text-white text-base">Cyber Runner 2099</h4>
              <p className="text-slate-400 text-xs">High-speed HTML5 runner game. Test reaction speed across digital grid anomalies.</p>
            </div>
          </Link>

          <Link href="/games/quantum-sudoku" className="clay-card overflow-hidden group block">
            <div className="h-48 bg-gradient-to-r from-purple-900 to-slate-900 relative flex items-center justify-center">
              <span className="text-2xl font-extrabold text-white tracking-widest uppercase opacity-80 group-hover:scale-110 transition-transform">Quantum Sudoku</span>
            </div>
            <div className="p-5 space-y-2">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span className="text-purple-400 font-semibold">Puzzle</span>
                <span>★ 4.90 (890 plays)</span>
              </div>
              <h4 className="font-bold text-white text-base">Quantum Sudoku</h4>
              <p className="text-slate-400 text-xs">Analytical puzzle challenge with progressive grid difficulty scaling.</p>
            </div>
          </Link>
        </div>
      </section>

      {/* AI ASSISTANT BANNER */}
      <section className="clay-panel p-8 md:p-12 border border-purple-500/30 bg-gradient-to-r from-purple-950/40 via-slate-900 to-indigo-950/40 flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Secure Server-Side AI Suite</span>
          </div>
          <h3 className="text-3xl font-extrabold text-white">Accelerate Your Technical Workflow</h3>
          <p className="text-slate-300 text-sm leading-relaxed">
            Generate code explanations, summarize research papers, draft emails, and correct grammar with server-authenticated AI models.
          </p>
        </div>
        <Link
          href="/ai"
          className="clay-button px-6 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg shadow-purple-600/30 whitespace-nowrap transition-all"
        >
          Open AI Assistant Hub
        </Link>
      </section>
    </div>
  );
}
