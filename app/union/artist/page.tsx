'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function ArtistConfigurationPage() {
  const [formData, setFormData] = useState({
    codeTalent: '', 
    email: '', 
    nameArtist: '', 
    nameChannel: '', 
    linkYT: '', 
    linkTopic1: '', 
    linkTopic2: '', 
    linkTopic3: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // URL Deployment Google Apps Script milikmu
    const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbw-HxUOLfSvQ-Cx84YBwvOUPhlC2Ii5LajBNjnoeBXyq72EyaVWPAcYKK9qhceMdytS/exec";
    
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(formData)
      });
      alert("CONFIGURATION SUBMITTED SUCCESSFULLY");
      // Reset form setelah sukses
      setFormData({
        codeTalent: '', email: '', nameArtist: '', nameChannel: '', linkYT: '', linkTopic1: '', linkTopic2: '', linkTopic3: ''
      });
    } catch (err) {
      console.error(err);
      alert("SUBMISSION FAILED");
    }
  };

  return (
    <div className="min-h-screen bg-black text-zinc-400 font-sans px-6 md:px-16 py-12">
      <Link href="/union" className="text-[10px] tracking-[0.3em] uppercase hover:text-white transition-colors">← BACK</Link>
      
      <div className="max-w-xl mx-auto mt-12">
        <h1 className="text-xl text-white tracking-[0.2em] mb-12 uppercase">OAC VERIFICATION PORTAL</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <input 
              placeholder="CODE TALENT" 
              required 
              value={formData.codeTalent}
              className="bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white w-full" 
              onChange={e => setFormData({...formData, codeTalent: e.target.value})} 
            />
            <input 
              placeholder="NAME ARTIST" 
              required 
              value={formData.nameArtist}
              className="bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white w-full" 
              onChange={e => setFormData({...formData, nameArtist: e.target.value})} 
            />
          </div>
          
          <input 
            placeholder="EMAIL YOUTUBE CHANNEL" 
            required 
            value={formData.email}
            className="w-full bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white" 
            onChange={e => setFormData({...formData, email: e.target.value})} 
          />
          <input 
            placeholder="NAME CHANNEL" 
            required 
            value={formData.nameChannel}
            className="w-full bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white" 
            onChange={e => setFormData({...formData, nameChannel: e.target.value})} 
          />
          <input 
            placeholder="LINK CHANNEL YOUTUBE" 
            required 
            value={formData.linkYT}
            className="w-full bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white" 
            onChange={e => setFormData({...formData, linkYT: e.target.value})} 
          />
          
          <div className="grid grid-cols-3 gap-2">
            <input 
              placeholder="TOPIC 1" 
              value={formData.linkTopic1}
              className="bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white w-full" 
              onChange={e => setFormData({...formData, linkTopic1: e.target.value})} 
            />
            <input 
              placeholder="TOPIC 2" 
              value={formData.linkTopic2}
              className="bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white w-full" 
              onChange={e => setFormData({...formData, linkTopic2: e.target.value})} 
            />
            <input 
              placeholder="TOPIC 3" 
              value={formData.linkTopic3}
              className="bg-zinc-950 border border-zinc-900 p-4 text-[10px] tracking-widest uppercase outline-none focus:border-white w-full" 
              onChange={e => setFormData({...formData, linkTopic3: e.target.value})} 
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-white text-black p-4 text-[10px] tracking-[0.3em] uppercase hover:bg-zinc-200 transition-all font-medium mt-4"
          >
            SUBMIT CONFIGURATION
          </button>
        </form>
      </div>
    </div>
  );
}