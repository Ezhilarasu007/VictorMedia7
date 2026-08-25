import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Clock, Calendar, Bookmark, Share2, ArrowLeft } from 'lucide-react';

interface ArticlePageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const title = params.slug.replace(/-/g, ' ').toUpperCase();
  return {
    title: `${title} | VictorMedia Article`,
    description: `Read technical analysis on ${title}. VictorMedia produces high-quality engineering tutorials and architectural guides.`,
    openGraph: {
      title: `${title} — VictorMedia`,
      description: `Read technical analysis on ${title}.`,
      url: `https://victormedia.net/articles/${params.slug}`,
      type: 'article',
      publishedTime: new Date().toISOString(),
    },
  };
}

export default function ArticleDetailPage({ params }: ArticlePageProps) {
  const { slug } = params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: slug.replace(/-/g, ' '),
    author: {
      '@type': 'Organization',
      name: 'VictorMedia Engineering Team',
    },
    publisher: {
      '@type': 'Organization',
      name: 'VictorMedia',
      logo: {
        '@type': 'ImageObject',
        url: 'https://victormedia.net/favicon.ico',
      },
    },
    datePublished: '2026-08-25',
    description: `Comprehensive technical breakdown on ${slug}.`,
  };

  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Link href="/articles" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Articles
      </Link>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-md bg-blue-500/10 text-blue-400 text-xs font-semibold uppercase tracking-wider">Web Architecture</span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> 6 min read</span>
          <span className="text-xs text-slate-400 flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> Aug 25, 2026</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight capitalize">
          {slug.replace(/-/g, ' ')}
        </h1>

        <div className="flex items-center justify-between pt-4 border-t border-b border-slate-800 py-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">VM</div>
            <div>
              <p className="font-semibold text-white">VictorMedia Editorial Team</p>
              <p className="text-[10px] text-slate-500">Verified Technical Publication</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-blue-400 transition-colors" title="Bookmark">
              <Bookmark className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-blue-400 transition-colors" title="Share">
              <Share2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* COMPLIANT ADSENSE IN-ARTICLE BANNER */}
      <div className="ad-container">
        <span>In-Article Advertisement Placeholder — Compliant AdSense Unit</span>
      </div>

      {/* ARTICLE BODY */}
      <div className="prose prose-invert max-w-none space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
        <p>
          Building enterprise-grade web applications requires careful balancing of rendering performance, data fetching boundaries, and client bundle size. With modern frameworks like Next.js 14, developers gain powerful abstractions such as React Server Components (RSC) and streaming edge functions.
        </p>

        <h2 className="text-xl sm:text-2xl font-bold text-white pt-4 border-t border-slate-800">1. Server Components vs Client Components</h2>
        <p>
          By default, all components inside the Next.js App Router are Server Components unless explicitly marked with the <code>&apos;use client&apos;</code> directive. Server components execute strictly on the server or during build time, resulting in zero client-side JavaScript bundle overhead for static views.
        </p>

        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-blue-300 overflow-x-auto">
          <code>
            {`// Server Component Example
export default async function Page() {
  const data = await fetchFromDatabase();
  return <MetricsGrid data={data} />;
}`}
          </code>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white pt-4 border-t border-slate-800">2. Row Level Security & Database Optimization</h2>
        <p>
          Integrating Supabase PostgreSQL ensures that authentication constraints are enforced directly at the database engine level. This guarantees that user bookmarks, quiz attempts, and profile fields are never exposed to unauthorized API queries.
        </p>
      </div>

      {/* FOOTER AD & RELATED ARTICLES */}
      <div className="ad-container">
        <span>Advertisement Placeholder — Google AdSense Compliant Unit</span>
      </div>
    </article>
  );
}
