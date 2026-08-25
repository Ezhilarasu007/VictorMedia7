import Link from 'next/link';
import { BookOpen, FileText } from 'lucide-react';

export const metadata = {
  title: 'User Study Notes | VictorMedia',
  description: 'Manage personal technical study notes and bookmarked lesson excerpts.',
};

export default function NotesPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">Study Notes & Highlights</h1>
        <p className="text-slate-400 text-sm">Your private saved notes across VictorMedia learning modules.</p>
      </div>

      <div className="glass-panel rounded-3xl p-8 text-center space-y-4 border border-slate-800">
        <FileText className="w-12 h-12 text-slate-500 mx-auto" />
        <h3 className="text-lg font-bold text-white">No Notes Created Yet</h3>
        <p className="text-slate-400 text-xs max-w-sm mx-auto">
          Start exploring courses in the Learning section to bookmark key snippets and take study notes.
        </p>
        <Link href="/learning" className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold">
          Explore Learning Tracks
        </Link>
      </div>
    </div>
  );
}
