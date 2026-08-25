export const metadata = { title: 'Contact Us | VictorMedia' };
export default function ContactPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 text-slate-300 text-sm">
      <h1 className="text-3xl font-extrabold text-white">Contact VictorMedia</h1>
      <div className="glass-panel rounded-3xl p-6 sm:p-8 space-y-4 border border-slate-800">
        <p>For inquiries, editorial suggestions, copyright matters, or support, reach out to us at:</p>
        <p className="font-semibold text-white">Email: <code>contact@victormedia.net</code></p>
      </div>
    </div>
  );
}
