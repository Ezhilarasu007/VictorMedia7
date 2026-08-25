export const metadata = {
  title: 'Privacy Policy | VictorMedia',
  description: 'VictorMedia Privacy Policy detailing data collection, user rights, cookies, and AdSense/AdMob compliance.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-300 text-sm leading-relaxed">
      <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: August 25, 2026 | Domain: victormedia.net</p>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">1. Information We Collect</h2>
          <p>
            VictorMedia collects only essential information required to provide our technical services, including account credentials (email, profile display name), quiz participation metrics, and anonymous device analytics.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">2. Advertising & Third-Party Cookies</h2>
          <p>
            We partner with Google AdSense (for website) and Google AdMob (for Android application) to serve non-intrusive advertisements. Google uses cookies to serve ads based on prior user visits. Users may opt out of personalized advertising by visiting Google Ad Settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">3. User Rights & Account Deletion</h2>
          <p>
            Users retain full rights to request data export or complete account deletion. You can execute account deletion anytime via your Account Settings panel.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-white">4. Contact Information</h2>
          <p>
            For privacy inquiries or compliance questions, contact us at <code>privacy@victormedia.net</code>.
          </p>
        </section>
      </div>
    </div>
  );
}
