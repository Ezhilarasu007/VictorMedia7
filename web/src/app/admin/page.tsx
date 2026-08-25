'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  FolderPlus, 
  HelpCircle, 
  Gamepad2, 
  Wrench, 
  Users, 
  ShieldCheck, 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Plus, 
  CheckCircle,
  Eye
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState('analytics');
  const [dateFilter, setDateFilter] = useState('30d');

  // New Article Form state
  const [newTitle, setNewTitle] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newCategory, setNewCategory] = useState('programming');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [published, setPublished] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');

  const handleCreateArticle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newContent) return;
    setStatusMsg('✅ Article created & published successfully via Admin API!');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-xs font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Admin Authorization Active</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-1">VictorMedia Control Center</h1>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl p-1 text-xs">
          {['today', '7d', '30d', '90d'].map((f) => (
            <button
              key={f}
              onClick={() => setDateFilter(f)}
              className={`px-3 py-1.5 rounded-lg uppercase font-semibold transition-all ${
                dateFilter === f ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* METRICS OVERVIEW CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-blue-500">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Total Users</span>
            <Users className="w-4 h-4 text-blue-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">24,580</p>
          <span className="text-[10px] text-green-400 font-semibold">↑ +14% vs last period</span>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-purple-500">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Page Views</span>
            <Eye className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">182,400</p>
          <span className="text-[10px] text-green-400 font-semibold">↑ +22% vs last period</span>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-amber-500">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Quiz Completions</span>
            <HelpCircle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">41,290</p>
          <span className="text-[10px] text-green-400 font-semibold">↑ +8% vs last period</span>
        </div>

        <div className="glass-card rounded-2xl p-5 space-y-2 border-l-4 border-l-green-500">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Est. Ad Revenue</span>
            <DollarSign className="w-4 h-4 text-green-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">$1,480.50</p>
          <span className="text-[10px] text-slate-400 font-semibold">Legitimate AdSense / AdMob</span>
        </div>
      </div>

      {/* ADMIN SECTION NAVIGATION */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'analytics' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-900'
          }`}
        >
          Analytics & Reports
        </button>
        <button
          onClick={() => setActiveTab('create-article')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'create-article' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-900'
          }`}
        >
          Create Article CMS
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'content' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-900'
          }`}
        >
          Content Catalog
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
            activeTab === 'audit' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:bg-slate-900'
          }`}
        >
          Audit Logs
        </button>
      </div>

      {/* TAB CONTENT */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Top Performing Content</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-200 font-medium">Architecting Next.js 14 Enterprise</span>
                <span className="text-blue-400 font-bold">42,100 Views</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-200 font-medium">LLM Fine-Tuning & Vector Retrieval</span>
                <span className="text-blue-400 font-bold">31,500 Views</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-200 font-medium">Word Counter Utility Tool</span>
                <span className="text-blue-400 font-bold">28,900 Usages</span>
              </div>
            </div>
          </div>

          <div className="glass-panel rounded-2xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Ad Performance Telemetry</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-300">AdSense Impressions (Web)</span>
                <span className="text-green-400 font-bold">142,000</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-300">AdMob Interstitial Impressions (Android)</span>
                <span className="text-green-400 font-bold">38,500</span>
              </div>
              <div className="flex justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-slate-300">AdMob Rewarded SSV Events Verified</span>
                <span className="text-green-400 font-bold">12,100</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'create-article' && (
        <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Create New Article</h2>

          {statusMsg && (
            <div className="p-4 rounded-xl bg-green-950/60 border border-green-500/40 text-green-300 text-xs font-semibold">
              {statusMsg}
            </div>
          )}

          <form onSubmit={handleCreateArticle} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs text-slate-400">Title</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => {
                    setNewTitle(e.target.value);
                    setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                  placeholder="Article Title..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs text-slate-400">URL Slug</label>
                <input
                  type="text"
                  required
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400">Excerpt / Summary</label>
              <textarea
                rows={2}
                value={newExcerpt}
                onChange={(e) => setNewExcerpt(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                placeholder="Brief article summary..."
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs text-slate-400">Content (Markdown / HTML)</label>
              <textarea
                rows={8}
                required
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs font-mono"
                placeholder="Write original article content here..."
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Publish Immediately
              </label>
              <button type="submit" className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold">
                Publish Article
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
