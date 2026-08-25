'use client';

import { useState } from 'react';
import { User, Bookmark, History, Settings, Trash2, LogOut, Shield } from 'lucide-react';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [email, setEmail] = useState('user@victormedia.net');
  const [displayName, setDisplayName] = useState('VictorMedia Engineering User');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-white">User Account & Settings</h1>
        <p className="text-slate-400 text-sm">Manage your profile details, saved bookmarks, quiz history, and account options.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* SIDEBAR TABS */}
        <div className="space-y-1 glass-panel rounded-2xl p-3 border border-slate-800">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'profile' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <User className="w-4 h-4" /> Profile
          </button>
          <button
            onClick={() => setActiveTab('bookmarks')}
            className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'bookmarks' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4" /> Bookmarks
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'history' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <History className="w-4 h-4" /> Quiz & Game History
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full text-left p-3 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'settings' ? 'bg-blue-600 text-white' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Settings className="w-4 h-4" /> Account Settings
          </button>
        </div>

        {/* TAB CONTENTS */}
        <div className="md:col-span-3 glass-panel rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-800">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">User Profile</h2>
              <div className="space-y-3">
                <label className="text-xs text-slate-400">Display Name</label>
                <input
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-white text-xs"
                />
              </div>
              <div className="space-y-3">
                <label className="text-xs text-slate-400">Email Address</label>
                <input
                  type="email"
                  disabled
                  value={email}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-slate-400 text-xs"
                />
              </div>
              <button className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold">
                Save Profile Changes
              </button>
            </div>
          )}

          {activeTab === 'bookmarks' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Saved Bookmarks</h2>
              <p className="text-xs text-slate-400">You currently have 2 saved articles in your personal reading list.</p>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Quiz & Game History</h2>
              <p className="text-xs text-slate-400">Daily Quiz Attempt — Scored 100/100 (Aug 25, 2026)</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="space-y-6">
              <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-3">Account Deletion & Data</h2>
              <div className="p-4 rounded-xl bg-red-950/30 border border-red-500/30 space-y-3">
                <p className="text-xs text-red-300 font-semibold">Danger Zone — Account Removal</p>
                <p className="text-[11px] text-slate-400">
                  Requesting account deletion permanently purges all profile data, quiz statistics, and bookmarks from VictorMedia servers in accordance with privacy laws.
                </p>
                <button className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete Account Permanently
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
