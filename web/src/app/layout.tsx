import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import Script from 'next/script';
import { 
  Home, 
  Compass, 
  Wrench, 
  Gamepad2, 
  User, 
  Newspaper, 
  GraduationCap, 
  Bot, 
  Search, 
  ShieldAlert, 
  FileText, 
  Lock, 
  Cookie, 
  Sparkles,
  Globe
} from 'lucide-react';

export const metadata: Metadata = {
  metadataBase: new URL('https://victormedia.net'),
  title: {
    default: 'VictorMedia — Next-Gen Technology, AI & Engineering Hub',
    template: '%s | VictorMedia',
  },
  description: 'VictorMedia is a premier digital engineering platform featuring technical articles, daily quizzes, HTML5 games, developer tools, and AI assistants.',
  keywords: ['Technology', 'Software Engineering', 'AI Tools', 'Developer Utilities', 'Daily Quizzes', 'HTML5 Games', 'Next.js', 'Flutter'],
  authors: [{ name: 'VictorMedia Engineering Team' }],
  other: {
    'google-adsense-account': 'ca-pub-6751037211810646',
  },
  openGraph: {
    title: 'VictorMedia — Digital Technology & Engineering Portal',
    description: 'Empowering engineers and tech enthusiasts with interactive tools, AI suite, daily quizzes, and technical commentary.',
    url: 'https://victormedia.net',
    siteName: 'VictorMedia',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VictorMedia — Digital Technology Portal',
    description: 'Premier destination for tech news, developer tools, AI workflows, and daily quizzes.',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google AdSense Direct Auto-Verification Script */}
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6751037211810646"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />

        {/* Google Analytics Script Placeholder */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body className="min-h-screen flex flex-col justify-between bg-[#0b0f19] text-slate-100 pb-16 md:pb-0">
        {/* Header Navigation */}
        <header className="sticky top-0 z-50 glass-panel border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
                V
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white group-hover:text-blue-400 transition-colors">
                VICTOR<span className="text-blue-500">MEDIA</span>
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
              <Link href="/" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all">Home</Link>
              <Link href="/news" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all">News</Link>
              <Link href="/learning" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all">Learning</Link>
              <Link href="/quizzes" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all">Quizzes</Link>
              <Link href="/games" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all">Games</Link>
              <Link href="/tools" className="px-3 py-2 rounded-lg hover:text-white hover:bg-slate-800/60 transition-all">Tools</Link>
              <Link href="/ai" className="px-3 py-2 rounded-lg text-purple-400 hover:text-purple-300 hover:bg-purple-950/30 flex items-center gap-1.5 transition-all">
                <Sparkles className="w-4 h-4" /> AI Hub
              </Link>
              <Link href="/search" className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/60 transition-all" title="Search">
                <Search className="w-4 h-4" />
              </Link>
            </nav>

            {/* Global Language Selector & Account */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="relative group">
                <button className="px-2.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 hover:border-blue-500 transition-colors">
                  <Globe className="w-3.5 h-3.5 text-blue-400" />
                  <span>EN</span>
                </button>
                <div className="absolute right-0 top-full mt-1 hidden group-hover:block glass-panel rounded-xl p-2 border border-slate-800 shadow-xl text-xs space-y-1 min-w-[120px] z-50">
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-slate-200">English (US)</button>
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-slate-200">Español (ES)</button>
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-slate-200">Français (FR)</button>
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-slate-200">Deutsch (DE)</button>
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-slate-200">Hindi (HI)</button>
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-slate-200">中文 (ZH)</button>
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-slate-200">日本語 (JA)</button>
                  <button className="w-full text-left px-2 py-1 rounded hover:bg-blue-600 hover:text-white text-slate-200">العربية (AR)</button>
                </div>
              </div>

              <Link
                href="/account"
                className="px-4 py-2 text-sm font-medium rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/30 transition-all flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>Account</span>
              </Link>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {children}
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-16 pt-12 pb-24 md:pb-12 text-sm text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white text-xs">V</div>
                  <span className="font-bold text-lg text-white">VICTOR<span className="text-blue-500">MEDIA</span></span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">
                  VictorMedia is a modern, high-quality technical publishing platform delivering insightful articles, interactive daily quizzes, safe HTML5 games, developer utilities, and AI tools.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Quick Exploration</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/news" className="hover:text-blue-400">Latest News</Link></li>
                  <li><Link href="/articles" className="hover:text-blue-400">Technical Articles</Link></li>
                  <li><Link href="/learning" className="hover:text-blue-400">Learning Tracks</Link></li>
                  <li><Link href="/quizzes" className="hover:text-blue-400">Daily Quizzes</Link></li>
                  <li><Link href="/tools" className="hover:text-blue-400">18 Free Utilities</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Platform & AI</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/ai" className="hover:text-purple-400">AI Assistant Suite</Link></li>
                  <li><Link href="/games" className="hover:text-blue-400">HTML5 Games Directory</Link></li>
                  <li><Link href="/notes" className="hover:text-blue-400">User Notes & Saved</Link></li>
                  <li><Link href="/about" className="hover:text-blue-400">About VictorMedia</Link></li>
                  <li><Link href="/contact" className="hover:text-blue-400">Contact Us</Link></li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-white mb-3 text-xs uppercase tracking-wider">Legal & Compliance</h4>
                <ul className="space-y-2 text-xs">
                  <li><Link href="/privacy" className="hover:text-slate-200">Privacy Policy</Link></li>
                  <li><Link href="/terms" className="hover:text-slate-200">Terms of Service</Link></li>
                  <li><Link href="/cookie-policy" className="hover:text-slate-200">Cookie Policy</Link></li>
                  <li><Link href="/disclaimer" className="hover:text-slate-200">Disclaimer</Link></li>
                  <li><Link href="/dmca" className="hover:text-slate-200">DMCA Policy</Link></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-slate-800/60 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500">
              <p>© {new Date().getFullYear()} VictorMedia (`victormedia.net`). All rights reserved.</p>
              <p className="mt-2 sm:mt-0">Built for legitimate high-value content delivery & global multi-language support.</p>
            </div>
          </div>
        </footer>

        {/* Mobile Navigation Bar (Fixed Bottom) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 glass-panel border-t border-slate-800/90 py-2 px-3">
          <nav className="flex items-center justify-around text-slate-400 text-[10px] font-medium">
            <Link href="/" className="flex flex-col items-center gap-1 hover:text-blue-400 transition-colors">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </Link>
            <Link href="/news" className="flex flex-col items-center gap-1 hover:text-blue-400 transition-colors">
              <Compass className="w-5 h-5" />
              <span>Explore</span>
            </Link>
            <Link href="/tools" className="flex flex-col items-center gap-1 hover:text-blue-400 transition-colors">
              <Wrench className="w-5 h-5" />
              <span>Tools</span>
            </Link>
            <Link href="/games" className="flex flex-col items-center gap-1 hover:text-blue-400 transition-colors">
              <Gamepad2 className="w-5 h-5" />
              <span>Games</span>
            </Link>
            <Link href="/account" className="flex flex-col items-center gap-1 hover:text-blue-400 transition-colors">
              <User className="w-5 h-5" />
              <span>Account</span>
            </Link>
          </nav>
        </div>
      </body>
    </html>
  );
}
