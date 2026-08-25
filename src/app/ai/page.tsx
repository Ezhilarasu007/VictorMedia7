'use client';

import { useState } from 'react';
import { Sparkles, Bot, Loader2, Send, Check, Copy, Video, Download, Play, Film, Clock, Monitor } from 'lucide-react';

export default function AiHubPage() {
  const [selectedTool, setSelectedTool] = useState('story-video');
  const [prompt, setPrompt] = useState('A futuristic cybernetic city at dusk with flying vehicles and glowing neon skyscrapers');
  const [duration, setDuration] = useState('60'); // 30s to 180s (3 mins)
  const [resolution, setResolution] = useState('4K');
  const [style, setStyle] = useState('Cinematic Sci-Fi');

  // Video Generator Output State
  const [videoData, setVideoData] = useState<any>(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const aiTools = [
    { id: 'story-video', name: 'AI Story & 4K Video Gen', desc: 'Generate 4K videos from text prompts (30s to 3 mins) with download.' },
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
    setVideoData(null);

    try {
      const isVideo = selectedTool === 'story-video';
      const endpoint = isVideo ? '/api/ai/story-video' : `/api/ai/${selectedTool}`;
      const payload = isVideo ? { prompt, duration, resolution, style } : { prompt };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (isVideo && data.success) {
        setVideoData(data);
        setResponse(data.storyScript);
      } else if (data.output) {
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
          <span>Server-Side AI Suite & 4K Video Renderer</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">VictorMedia AI Assistant & 4K Video Suite</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Generate creative stories, 4K video renders (30s to 3 mins), code explanations, and technical summaries. Download generated 4K MP4 videos directly to your device.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* TOOL SELECTOR SIDEBAR */}
        <div className="space-y-2 glass-panel rounded-2xl p-4 border border-slate-800">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-2 mb-3">AI Tools & Video Studio</h3>
          {aiTools.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setSelectedTool(t.id);
                setResponse('');
                setVideoData(null);
              }}
              className={`w-full text-left p-3 rounded-xl transition-all block text-xs ${
                selectedTool === t.id
                  ? 'bg-purple-600 text-white font-bold shadow-md shadow-purple-600/30'
                  : 'text-slate-300 hover:bg-slate-800/60'
              }`}
            >
              <div className="font-semibold flex items-center gap-1.5">
                {t.id === 'story-video' && <Video className="w-3.5 h-3.5 text-purple-300" />}
                <span>{t.name}</span>
              </div>
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
                {selectedTool === 'story-video' ? <Video className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">
                  {aiTools.find((t) => t.id === selectedTool)?.name}
                </h2>
                <p className="text-xs text-slate-400">
                  {selectedTool === 'story-video' ? 'Enter story prompt to render 4K video (30s to 3 minutes)' : 'Server-authenticated AI Assistant'}
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* VIDEO GENERATOR CONTROLS (IF STORY-VIDEO SELECTED) */}
            {selectedTool === 'story-video' && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs">
                <div className="space-y-1.5">
                  <label className="text-slate-400 flex items-center gap-1 font-semibold">
                    <Clock className="w-3.5 h-3.5 text-purple-400" /> Video Duration:
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:outline-none"
                  >
                    <option value="30">30 Seconds (Shorts/Reels)</option>
                    <option value="60">60 Seconds (1 Minute)</option>
                    <option value="120">120 Seconds (2 Minutes)</option>
                    <option value="180">180 Seconds (3 Minutes)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 flex items-center gap-1 font-semibold">
                    <Monitor className="w-3.5 h-3.5 text-blue-400" /> Resolution:
                  </label>
                  <select
                    value={resolution}
                    onChange={(e) => setResolution(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:outline-none"
                  >
                    <option value="4K">4K Ultra HD (3840x2160)</option>
                    <option value="1080p">1080p Full HD (1920x1080)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-slate-400 flex items-center gap-1 font-semibold">
                    <Film className="w-3.5 h-3.5 text-emerald-400" /> Visual Style:
                  </label>
                  <select
                    value={style}
                    onChange={(e) => setStyle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white font-semibold focus:outline-none"
                  >
                    <option value="Cinematic Sci-Fi">Cinematic Sci-Fi</option>
                    <option value="Cyberpunk Neon">Cyberpunk Neon</option>
                    <option value="Photorealistic Nature">Photorealistic Nature</option>
                    <option value="Anime Action">Anime Action</option>
                    <option value="Documentary 4K">Documentary 4K</option>
                  </select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300">Prompt / Story Narrative Concept:</label>
              <textarea
                rows={4}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter prompt or story idea (e.g. An ancient underwater futuristic temple surrounded by bioluminescent sea creatures)..."
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-purple-500 font-sans placeholder-slate-500"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading || !prompt.trim()}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-purple-600/20"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : (selectedTool === 'story-video' ? <Film className="w-4 h-4" /> : <Send className="w-4 h-4" />)}
                <span>{selectedTool === 'story-video' ? 'Render 4K Story Video' : 'Generate Response'}</span>
              </button>
            </div>
          </form>

          {/* GENERATED 4K VIDEO RENDER PLAYER */}
          {videoData && (
            <div className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold">
                    {videoData.resolution}
                  </span>
                  <span className="text-xs text-slate-400">Duration: {videoData.duration}</span>
                </div>

                {/* DIRECT DOWNLOAD 4K VIDEO BUTTON */}
                <a
                  href={videoData.videoUrl}
                  download={videoData.downloadFileName}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-600/30 transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span>Download 4K Video (.mp4)</span>
                </a>
              </div>

              {/* HTML5 VIDEO PLAYER PREVIEW */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black border border-slate-800 shadow-2xl">
                <video
                  src={videoData.videoUrl}
                  controls
                  autoPlay
                  loop
                  className="w-full h-full object-cover"
                />
              </div>

              {/* SCENE TIMELINE BREAKDOWN */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Generated Scene Breakdown ({videoData.duration})</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {videoData.scenes?.map((scene: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-900 border border-slate-800 space-y-1 text-xs">
                      <div className="flex items-center justify-between text-purple-400 font-bold">
                        <span>{scene.title}</span>
                        <span className="text-[10px] text-slate-500">{scene.time}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] leading-relaxed">{scene.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI TEXT OUTPUT (IF APPLICABLE) */}
          {response && !videoData && (
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
