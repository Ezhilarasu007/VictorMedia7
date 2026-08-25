export const metadata = {
  title: 'Terms of Service | VictorMedia',
  description: 'VictorMedia Terms of Service governing platform usage, legal compliance, and acceptable conduct.',
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-300 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Terms of Service</h1>
      <p className="text-xs text-slate-500">Effective Date: August 25, 2026 | Domain: victormedia.net</p>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Acceptance of Terms</h2>
          <p>By accessing VictorMedia (victormedia.net), you agree to comply with these terms, applicable copyright laws, and publisher guidelines.</p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Acceptable Conduct & Ad Compliance</h2>
          <p>
            Users must not attempt click manipulation, automated traffic generation, bot interaction, or reverse engineering of VictorMedia monetization systems.
          </p>
        </section>
      </div>
    </div>
  );
}
