'use client';

import { useState } from 'react';
import { Heart, QrCode, Copy, Check, X, CreditCard, Send, ShieldCheck } from 'lucide-react';

export default function DonationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('100');
  const [copied, setCopied] = useState(false);

  const upiId = 'arasu9629hf@okhdfcbank';
  const presets = ['100', '500', '1000', '2500', '5000'];

  const upiPayLink = `upi://pay?pa=${upiId}&pn=VictorMedia&am=${amount}&cu=INR`;

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* HEADER DONATE TRIGGER BUTTON */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-semibold text-xs shadow-md flex items-center gap-1.5 transition-all transform hover:scale-105"
      >
        <Heart className="w-3.5 h-3.5 fill-white animate-pulse" />
        <span>Donate ₹{amount}</span>
      </button>

      {/* DONATION MODAL OVERLAY */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="glass-panel rounded-3xl w-full max-w-lg p-6 sm:p-8 space-y-6 relative border border-emerald-500/30">
            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-900 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2 text-center">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <Heart className="w-6 h-6 fill-emerald-400" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Support VictorMedia</h2>
              <p className="text-slate-400 text-xs max-w-sm mx-auto leading-relaxed">
                Directly empower our server infrastructure, free developer tools, and technical publishing.
              </p>
            </div>

            {/* PRESET AMOUNT SELECTOR */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block text-center">Select Donation Amount (₹ INR)</label>
              <div className="grid grid-cols-5 gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setAmount(preset)}
                    className={`py-2 rounded-xl text-xs font-bold transition-all ${
                      amount === preset
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    ₹{preset}
                  </button>
                ))}
              </div>

              {/* CUSTOM AMOUNT INPUT */}
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 font-bold text-sm">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter custom amount..."
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white font-bold text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            {/* UPI DETAILS & QR CODE */}
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-4 text-center">
              <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                <span className="text-slate-400">UPI ID:</span>
                <span className="font-mono text-emerald-400 font-bold">{upiId}</span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-blue-400 hover:text-white flex items-center gap-1 font-semibold"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* DYNAMIC QR CODE DISPLAY */}
              <div className="p-4 bg-white rounded-2xl inline-block shadow-lg mx-auto">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(upiPayLink)}`}
                  alt="VictorMedia UPI Donation QR Code"
                  className="w-40 h-40 object-contain mx-auto"
                />
              </div>
              <p className="text-[11px] text-slate-400">Scan with Google Pay, PhonePe, Paytm, or BHIM UPI app</p>
            </div>

            {/* ONE TAP PAY BUTTON */}
            <a
              href={upiPayLink}
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all text-center"
            >
              <Send className="w-4 h-4" />
              <span>Tap to Pay ₹{amount || '100'} via UPI</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
