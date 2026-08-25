'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, FileText, Wrench, Gamepad2, Trophy, BookOpen } from 'lucide-react';

export default function SearchPage() {
  const [query, setQuery] = useState('');

  const mockDatabase = [
    { title: 'Architecting Next.js 14 Web Applications', type: 'Article', href: '/articles/architecting-nextjs-14-enterprise' },
    { title: 'LLM Fine-Tuning & Vector Retrieval', type: 'Article', href: '/articles/llm-fine-tuning-vector-retrieval' },
    { title: 'Word Counter Tool', type: 'Tool', href: '/tools/word-counter' },
    { title: 'JSON Formatter & Validator', type: 'Tool', href: '/tools/json-formatter' },
    { title: 'Cyber Runner 2099', type: 'Game', href: '/games/cyber-runner-2099' },
    { title: 'Daily Web Architecture & Security Quiz', type: 'Quiz', href: '/quizzes/daily-web-architecture-quiz' }
  ];

  const results = query.trim()
    ? mockDatabase.filter((item) => item.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-extrabold text-white">Unified Platform Search</h1>
        <p className="text-slate-400 text-sm">Search across technical articles, interactive tools, daily quizzes, and HTML5 games.</p>
      </div>

      <div className="relative">
        <Search className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keyword (e.g. Next.js, JSON, Quiz, Cyber)..."
          className="w-full pl-12 pr-4 py-3 rounded-2xl bg-slate-900 border border-slate-800 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="space-y-3">
        {query && results.length === 0 && (
          <p className="text-slate-400 text-sm text-center py-8">No results found matching &quot;{query}&quot;.</p>
        )}
        {results.map((res, idx) => (
          <Link key={idx} href={res.href} className="glass-card rounded-xl p-4 flex items-center justify-between block group">
            <span className="font-semibold text-white group-hover:text-blue-400 text-sm">{res.title}</span>
            <span className="text-xs px-2.5 py-0.5 rounded bg-slate-800 text-blue-400 font-bold uppercase">{res.type}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
