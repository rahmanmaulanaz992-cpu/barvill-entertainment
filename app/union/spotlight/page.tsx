'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function HeavensTrialPage() {
  const [formData, setFormData] = useState({
    title: '', artist: '', genre: 'Pop', platform: 'Spotify', link: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // URL Deployment untuk HEAVEN'S TRIAL
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzDFTtu-wEdFUo1968crKFTP6VoX_GMUe_4Dc9vjTyUZsavhMlH0M0ArEJ6SP3q_xYYeA/exec";
    
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      alert("SUBMISSION SENT TO HEAVEN'S TRIAL");
      // Reset form setelah berhasil submit
      setFormData({ title: '', artist: '', genre: 'Pop', platform: 'Spotify', link: '' });
    } catch (err) {
      console.error(err);
      alert("SUBMISSION FAILED");
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans px-6 md:px-16 py-12">
      <Link href="/union" className="text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">← BACK</Link>
      
      <div className="max-w-xl mx-auto mt-12">
        <h1 className="text-xl text-white tracking-[0.2em] mb-2 uppercase">HEAVEN'S TRIAL</h1>
        <p className="text-[10px] tracking-widest mb-12 uppercase">Weekly Playlist Radar Submission</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="TRACK TITLE" 
            required 
            value={formData.title}
            className="w-full bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white" 
            onChange={e => setFormData({...formData, title: e.target.value})} 
          />
          <input 
            placeholder="ARTIST NAME" 
            required 
            value={formData.artist}
            className="w-full bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white" 
            onChange={e => setFormData({...formData, artist: e.target.value})} 
          />
          
          <div className="grid grid-cols-2 gap-4">
            <select 
              className="bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white" 
              onChange={e => setFormData({...formData, genre: e.target.value})}
            >
              {['Pop', 'Mandopop', 'J-Pop', 'K-Pop', 'Indo Pop (I-Pop)', 'Cantopop', 'Rock', 'Alternative', 'Indie', 'Hip-Hop / Rap', 'R&B', 'Soul', 'Funk', 'Electronic', 'Dance / EDM', 'Ambient', 'Classical', 'Soundtrack / Score', 'Jazz', 'Blues', 'Folk / Acoustic', 'Country', 'Reggae', 'Latin', 'Afrobeats', 'Metal', 'Punk', 'New Age', 'Gospel'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select 
              className="bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white" 
              onChange={e => setFormData({...formData, platform: e.target.value})}
            >
              {['Spotify', 'YouTube Music', 'Apple Music', 'QQ Music', 'Amazon Music'].map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <input 
            placeholder="TRACK LINK" 
            required 
            value={formData.link}
            className="w-full bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white" 
            onChange={e => setFormData({...formData, link: e.target.value})} 
          />
          
          <button type="submit" className="w-full bg-white text-black p-4 text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-200 transition-all font-medium mt-4">
            INITIATE TRIAL
          </button>
        </form>
      </div>
    </div>
  );
}