'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Copy, Check, RefreshCw, Wrench } from 'lucide-react';

interface ToolProps {
  params: {
    slug: string;
  };
}

export default function ToolDetailPage({ params }: ToolProps) {
  const { slug } = params;
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  // Tool 7: Password Generator state
  const [length, setLength] = useState(16);
  const [includeSymbols, setIncludeSymbols] = useState(true);

  // Tool 9: Unit Converter state
  const [unitValue, setUnitValue] = useState(1);
  const [unitType, setUnitType] = useState('kmToMiles');

  // Tool 10: Percentage Calculator
  const [percNum1, setPercNum1] = useState(20);
  const [percNum2, setPercNum2] = useState(150);

  // Tool 11: Age Calculator
  const [birthDate, setBirthDate] = useState('1998-05-15');

  // Real-time recalculation effect
  useEffect(() => {
    switch (slug) {
      case 'word-counter': {
        const words = input.trim() ? input.trim().split(/\s+/).length : 0;
        const chars = input.length;
        const readTime = Math.ceil(words / 200);
        setOutput(`Words: ${words} | Characters: ${chars} | Est. Reading Time: ${readTime} min`);
        break;
      }
      case 'character-counter': {
        const total = input.length;
        const noSpaces = input.replace(/\s+/g, '').length;
        const tweets = Math.ceil(total / 280);
        setOutput(`Total Chars: ${total} | Excl. Spaces: ${noSpaces} | Twitter Posts (~280 chars): ${tweets}`);
        break;
      }
      case 'json-formatter': {
        if (!input) return setOutput('');
        try {
          const parsed = JSON.parse(input);
          setOutput(JSON.stringify(parsed, null, 2));
        } catch (e: any) {
          setOutput(`Invalid JSON: ${e.message}`);
        }
        break;
      }
      case 'json-validator': {
        if (!input) return setOutput('');
        try {
          JSON.parse(input);
          setOutput('✅ Valid JSON structure!');
        } catch (e: any) {
          setOutput(`❌ Invalid JSON: ${e.message}`);
        }
        break;
      }
      case 'base64-tool': {
        if (!input) return setOutput('');
        try {
          setOutput(btoa(input));
        } catch (e) {
          try {
            setOutput(atob(input));
          } catch (err) {
            setOutput('Base64 transformation failed.');
          }
        }
        break;
      }
      case 'url-encoder': {
        if (!input) return setOutput('');
        setOutput(encodeURIComponent(input));
        break;
      }
      case 'text-case-converter': {
        if (!input) return setOutput('');
        const upper = input.toUpperCase();
        const lower = input.toLowerCase();
        const camel = input.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) =>
          index === 0 ? letter.toLowerCase() : letter.toUpperCase()
        ).replace(/\s+/g, '');
        setOutput(`UPPERCASE:\n${upper}\n\nlowercase:\n${lower}\n\ncamelCase:\n${camel}`);
        break;
      }
      case 'timestamp-converter': {
        const val = input ? parseInt(input, 10) : Date.now();
        const date = new Date(val > 10000000000 ? val : val * 1000);
        setOutput(`ISO 8601: ${date.toISOString()}\nUTC String: ${date.toUTCString()}\nLocal: ${date.toLocaleString()}`);
        break;
      }
      case 'markdown-previewer': {
        setOutput(input.replace(/^# (.*$)/gim, '<h1>$1</h1>').replace(/^## (.*$)/gim, '<h2>$1</h2>').replace(/\*\*(.*)\*\*/gim, '<b>$1</b>'));
        break;
      }
      default:
        break;
    }
  }, [input, slug]);

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789' + (includeSymbols ? '!@#$%^&*()_+-=' : '');
    let res = '';
    for (let i = 0; i < length; i++) {
      res += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setOutput(res);
  };

  const calculateAge = () => {
    const birth = new Date(birthDate);
    const now = new Date();
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) {
      years--;
      months += 12;
    }
    setOutput(`Age: ${years} Years, ${months} Months`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <Link href="/tools" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Tools Directory
      </Link>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 flex items-center justify-center font-bold">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">{slug.replace(/-/g, ' ')}</h1>
            <p className="text-xs text-slate-400">100% Client-Side Interactive Tool</p>
          </div>
        </div>

        {/* CUSTOM CONTROLS BASED ON SLUG */}
        {slug === 'password-generator' ? (
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <label className="text-xs font-medium text-slate-300">Length: {length}</label>
              <input
                type="range"
                min="8"
                max="64"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full max-w-xs"
              />
              <label className="flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => setIncludeSymbols(e.target.checked)}
                />
                Include Symbols
              </label>
            </div>
            <button
              onClick={generatePassword}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Generate Password
            </button>
          </div>
        ) : slug === 'age-calculator' ? (
          <div className="space-y-4">
            <label className="block text-xs text-slate-400">Select Date of Birth:</label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
            />
            <button
              onClick={calculateAge}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold block"
            >
              Calculate Age
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-300">Input Data / Text:</label>
            <textarea
              rows={6}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste or type text here..."
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-800 text-white text-sm focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>
        )}

        {/* OUTPUT AREA */}
        <div className="space-y-2 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300">Output Result:</label>
            {output && (
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy Result'}</span>
              </button>
            )}
          </div>
          <textarea
            readOnly
            rows={6}
            value={output}
            placeholder="Result will appear here automatically..."
            className="w-full p-4 rounded-xl bg-slate-950 border border-slate-800/80 text-blue-300 text-sm focus:outline-none font-mono"
          />
        </div>
      </div>

      <div className="ad-container">
        <span>Advertisement Placeholder — Google AdSense Approved Placement</span>
      </div>
    </div>
  );
}
