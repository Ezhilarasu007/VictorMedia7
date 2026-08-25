import Link from 'next/link';
import { GraduationCap, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Learning Courses & Curriculum | VictorMedia',
  description: 'Structured educational tracks in Programming, AI, Cybersecurity, Web Development, and Mobile Development.',
};

export default function LearningPage() {
  const tracks = [
    { title: 'Programming Fundamentals', slug: 'programming', lessons: 12, category: 'Core' },
    { title: 'AI & Large Language Models', slug: 'ai', lessons: 8, category: 'AI' },
    { title: 'Cybersecurity & Ethical Hacking', slug: 'cybersecurity', lessons: 15, category: 'Security' },
    { title: 'Full-Stack Web Development', slug: 'web-development', lessons: 20, category: 'Web' },
    { title: 'Flutter Mobile Engineering', slug: 'mobile-development', lessons: 10, category: 'Mobile' },
    { title: 'Technical Interview Preparation', slug: 'interview-prep', lessons: 25, category: 'Career' },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold">
          <GraduationCap className="w-3.5 h-3.5" />
          <span>Structured Learning Paths</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white">VictorMedia Academy</h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Comprehensive step-by-step technical lessons written by industry engineers with code examples, practical benchmarks, and self-assessment quizzes.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tracks.map((track) => (
          <div key={track.slug} className="glass-card rounded-2xl p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-wider">{track.category}</span>
                <span className="text-xs text-slate-400">{track.lessons} Lessons</span>
              </div>
              <h3 className="font-bold text-white text-lg">{track.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Master key concepts with structured code samples, architecture diagrams, and interactive tests.
              </p>
            </div>
            <Link href={`/learning/${track.slug}`} className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-blue-500 text-center text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all">
              <span>Start Course</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
