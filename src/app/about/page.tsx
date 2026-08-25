export const metadata = { title: 'About Us | VictorMedia' };
export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-300 text-sm">
      <h1 className="text-3xl font-extrabold text-white">About VictorMedia</h1>
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <p>
          VictorMedia (`victormedia.net`) is an independent technical publishing and developer tools platform founded to provide original technical commentary, verified interactive utilities, daily educational quizzes, and server-authenticated AI tools.
        </p>
      </div>
    </div>
  );
}
