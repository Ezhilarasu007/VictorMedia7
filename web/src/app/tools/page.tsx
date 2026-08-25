import Link from 'next/link';
import { 
  FileText, 
  AlignLeft, 
  Code, 
  CheckCircle, 
  Binary, 
  Link as LinkIcon, 
  ShieldCheck, 
  QrCode, 
  Calculator, 
  Percent, 
  Calendar, 
  Type, 
  Eye, 
  Palette, 
  Clock,
  Wrench
} from 'lucide-react';

export const metadata = {
  title: 'Free Developer & Productivity Tools | VictorMedia',
  description: '15 free client-side tools including Word Counter, JSON Formatter, Base64 Converter, Password Generator, QR Code Generator, and Unit Converter.',
};

export default function ToolsIndexPage() {
  const tools = [
    { slug: 'word-counter', name: 'Word Counter', desc: 'Count words, sentences, reading time in real-time.', icon: FileText, cat: 'Text' },
    { slug: 'character-counter', name: 'Character Counter', desc: 'Analyze character density and platform limits.', icon: AlignLeft, cat: 'Text' },
    { slug: 'json-formatter', name: 'JSON Formatter', desc: 'Format and beautify nested JSON objects.', icon: Code, cat: 'Developer' },
    { slug: 'json-validator', name: 'JSON Validator', desc: 'Validate syntax and diagnose structural errors.', icon: CheckCircle, cat: 'Developer' },
    { slug: 'base64-tool', name: 'Base64 Encoder/Decoder', desc: 'Convert text to Base64 or decode Base64 strings.', icon: Binary, cat: 'Developer' },
    { slug: 'url-encoder', name: 'URL Encoder/Decoder', desc: 'Escape special characters for query parameters.', icon: LinkIcon, cat: 'Developer' },
    { slug: 'password-generator', name: 'Password Generator', desc: 'Generate strong cryptographically random passwords.', icon: ShieldCheck, cat: 'Security' },
    { slug: 'qr-generator', name: 'QR Code Generator', desc: 'Create high-resolution QR codes for links & text.', icon: QrCode, cat: 'Utility' },
    { slug: 'unit-converter', name: 'Unit Converter', desc: 'Convert measurements between metric and imperial.', icon: Calculator, cat: 'Math' },
    { slug: 'percentage-calculator', name: 'Percentage Calculator', desc: 'Calculate percentage changes and discounts.', icon: Percent, cat: 'Math' },
    { slug: 'age-calculator', name: 'Age Calculator', desc: 'Calculate exact age in years, days, and leap years.', icon: Calendar, cat: 'Utility' },
    { slug: 'text-case-converter', name: 'Text Case Converter', desc: 'Convert UPPERCASE, lowercase, camelCase, snake_case.', icon: Type, cat: 'Text' },
    { slug: 'markdown-previewer', name: 'Markdown Previewer', desc: 'Write GitHub-flavored markdown with live preview.', icon: Eye, cat: 'Text' },
    { slug: 'color-converter', name: 'Color Converter', desc: 'Convert HEX, RGB, HSL, and HSV color values.', icon: Palette, cat: 'Design' },
    { slug: 'timestamp-converter', name: 'Timestamp Converter', desc: 'Convert UNIX epoch timestamps to ISO dates.', icon: Clock, cat: 'Developer' }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
          <Wrench className="w-3.5 h-3.5" />
          <span>100% Free & Privacy-First</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">VictorMedia Free Online Tools</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Fast, client-side utility suite designed for developers, writers, and engineers. No registration required. Works completely offline in your browser.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link key={t.slug} href={`/tools/${t.slug}`} className="glass-card rounded-2xl p-6 space-y-4 block group">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-400">{t.cat}</span>
              </div>
              <div>
                <h3 className="font-bold text-white text-base group-hover:text-blue-400 transition-colors">{t.name}</h3>
                <p className="text-slate-400 text-xs mt-1 leading-relaxed">{t.desc}</p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="ad-container">
        <span>Advertisement Placeholder — Google AdSense Approved Placement</span>
      </div>
    </div>
  );
}
