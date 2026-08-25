'use client';

import { useState } from 'react';
import { Sparkles, Bot, Loader2, Send, Check, Copy } from 'lucide-react';

export default function AiHubPage() {
  const [selectedTool, setSelectedTool] = useState('text-assistant');
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const aiTools = [
    { id: 'text-assistant', name: 'AI Text Assistant', desc: 'General purpose drafting, answering, and rewriting.' },
    { id: 'summarizer', name: 'Technical Summarizer', desc: 'Distill articles, papers, or logs into structured key points.' },
    { id: 'grammar', name: 'Grammar & Style Fixer', desc: 'Refine technical writing, syntax, and tone.' },
    { id: 'idea-generator', name: 'Idea & Topic Generator', desc: 'Brainstorm article ideas, project features, or startup concepts.' },
    { id: 'study-assistant', name: 'Study Assistant', desc: 'Generate flashcards, quiz questions, and study notes.' },
    { id: 'code-explain', name: 'Code Explanation', desc: 'Deconstruct complex code snippets, algorithms, and SQL.' },
    { id: 'email-generator', name: 'Professional Email Gen', desc: 'Draft concise corporate, security, or outreach emails.' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await fetch(`/api/ai/${selectedTool}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if (data.output) {
        setResponse(data.output);
      } else {
        setResponse('An error occurred during AI processing. Please check server configurations.');
      }
    } catch (error) {
      setResponse('Server connection error. Ensure API routes are configured.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Server-Side Secure Architecture</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">VictorMedia AI Assistant Suite</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Leverage server-authenticated AI models for code analysis, content summarization, and study assistance. All API keys remain 100% secure on the server.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* TOOL SELECTOR SIDEBAR */}
        <div className="space-y-2 glass-panel rounded-2xl p-4 border border-slate-800">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">AI Assistants</h3>
          {aiTools.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTool(t.id);
                setResponse('');
              }}
              className={`w-full text-left p-3 rounded-xl transition-all block text-xs ${
                selectedTool === t.id
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="font-semibold">{t.name}</div>
              <div className={`text-[10px] mt-0.5 ${selectedTool === t.id ? 'text-purple-200' : 'text-slate-400'}`}>
                {t.desc}
              </div>
            </button>
          ))}
        </div>

        {/* WORKSPACE */}
        <div className="lg:col-span-3 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                <Bot className="w-5 h-5" />
              </div>
              <h2 className="text-lg font-bold text-white">
                {aiTools.find((t) => t.id === selectedTool)?.name}
              </h2>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              rows={5}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Enter your query, code snippet, or text to analyze..."
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500 font-sans placeholder-slate-500"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                <span>Generate Response</span>
              </button>
            </div>
          </form>

          {/* AI OUTPUT */}
          {response && (
            <div className="space-y-3 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-purple-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Generated Output
                </span>
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 text-slate-200 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                {response}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
