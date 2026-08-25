import Link from 'next/link';
import { Clock, BookOpen, Search, Filter } from 'lucide-react';

export const metadata = {
  title: 'Engineering Articles & News | VictorMedia',
  description: 'In-depth engineering commentary, Web Development, Cybersecurity, AI, and Mobile Development articles.',
};

export default function ArticlesPage() {
  const articles = [
    {
      title: 'Architecting Next.js 14 Web Applications for Enterprise Scale',
      slug: 'architecting-nextjs-14-enterprise',
      excerpt: 'Explore the modern App Router architecture, server components, edge caching, and scalable state management strategies.',
      category: 'Web Development',
      readingTime: 6,
      date: 'Aug 25, 2026',
    },
    {
      title: 'Understanding Large Language Model Fine-Tuning & Vector Retrieval',
      slug: 'llm-fine-tuning-vector-retrieval',
      excerpt: 'A deep dive into Retrieval-Augmented Generation (RAG), vector databases (pgvector), and parameter-efficient fine-tuning (LoRA).',
      category: 'AI',
      readingTime: 8,
      date: 'Aug 24, 2026',
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Articles & Technical Commentary</h1>
          <p className="text-slate-400 text-sm mt-1">Original technical analysis and software architecture deep dives.</p>
        </div>
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Filter articles..." className="bg-transparent text-xs text-white focus:outline-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {articles.map((art) => (
          <article key={art.slug} className="glass-card rounded-2xl p-6 space-y-4 flex flex-col justify-between group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold">{art.category}</span>
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {art.readingTime} min read
                </span>
              </div>
              <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                <Link href={`/articles/${art.slug}`}>{art.title}</Link>
              </h2>
              <p className="text-slate-400 text-xs leading-relaxed">{art.excerpt}</p>
            </div>
            <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-400">
              <span>Published {art.date}</span>
              <Link href={`/articles/${art.slug}`} className="text-blue-400 font-semibold hover:underline">Read Article →</Link>
            </div>
          </article>
        ))}
      </div>

      <div className="ad-container">
        <span>Advertisement Placeholder — Google AdSense Approved Placement</span>
      </div>
    </div>
  );
}
