'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Trophy, CheckCircle2, XCircle, ArrowLeft, RefreshCw } from 'lucide-react';

interface QuizProps {
  params: {
    slug: string;
  };
}

export default function QuizRunnerPage({ params }: QuizProps) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      question: 'Which HTTP header is specifically designed to mitigate Cross-Site Scripting (XSS) attacks?',
      options: [
        'Strict-Transport-Security',
        'Content-Security-Policy',
        'X-Frame-Options',
        'Access-Control-Allow-Origin'
      ],
      correctIndex: 1,
      explanation: 'Content-Security-Policy (CSP) restricts the resource origins (scripts, styles, images) that the browser is permitted to load.'
    },
    {
      question: 'What is the primary benefit of using PostgreSQL Row Level Security (RLS)?',
      options: [
        'Faster query execution speed',
        'Enforcing security constraints at the database engine level',
        'Automatic table partitioning',
        'Client-side state caching'
      ],
      correctIndex: 1,
      explanation: 'RLS guarantees data isolation directly inside the PostgreSQL database engine, ensuring clients cannot bypass access rules.'
    }
  ];

  const currentQ = questions[currentIdx];

  const handleSelectOption = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 10);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setCompleted(true);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Link href="/quizzes" className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Quizzes
      </Link>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
        {!completed ? (
          <>
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <span className="text-xs font-semibold text-amber-400">Question {currentIdx + 1} of {questions.length}</span>
              <span className="text-xs font-bold text-white bg-slate-900 px-3 py-1 rounded-full border border-slate-800">Current Score: {score} pts</span>
            </div>

            <h2 className="text-lg font-bold text-white leading-relaxed">{currentQ.question}</h2>

            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-900/90 border-slate-800 text-slate-200 hover:border-blue-500';
                if (isAnswered) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-green-950/60 border-green-500 text-green-300 font-bold';
                  } else if (idx === selectedOption) {
                    btnStyle = 'bg-red-950/60 border-red-500 text-red-300';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isAnswered && idx === currentQ.correctIndex && <CheckCircle2 className="w-4 h-4 text-green-400" />}
                    {isAnswered && idx === selectedOption && idx !== currentQ.correctIndex && <XCircle className="w-4 h-4 text-red-400" />}
                  </button>
                );
              })}
            </div>

            {isAnswered && (
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400 block mb-1">Explanation:</span>
                  {currentQ.explanation}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleNext}
                    className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
                  >
                    {currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Quiz'}
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8 space-y-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
              <Trophy className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Quiz Completed!</h2>
            <p className="text-slate-300 text-sm">
              You scored <span className="font-bold text-amber-400">{score}</span> out of {questions.length * 10} points!
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <button
                onClick={() => {
                  setCurrentIdx(0);
                  setSelectedOption(null);
                  setIsAnswered(false);
                  setScore(0);
                  setCompleted(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Try Again
              </button>
              <Link
                href="/quizzes"
                className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                All Quizzes
              </Link>
            </div>
          </div>
        )}
      </div>

      <div className="ad-container">
        <span>Advertisement Placeholder — Google AdSense Approved Placement</span>
      </div>
    </div>
  );
}
