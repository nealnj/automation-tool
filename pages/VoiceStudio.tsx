
import React, { useState, useRef } from 'react';
import { Mic, Play, Download, Volume2, User, Globe, Sliders, Pause, Loader2, Radio } from 'lucide-react';

export default function VoiceStudio() {
  const [voiceText, setVoiceText] = useState('Welcome to the smart vehicle navigation system. Please say your destination.');
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [activeSample, setActiveSample] = useState<number | null>(null);
  const [injectingTo, setInjectingTo] = useState<number | null>(null);

  const togglePreview = () => {
    setIsPreviewing(!isPreviewing);
    setTimeout(() => setIsPreviewing(false), 3000);
  };

  const handleInject = async (id: number) => {
    setInjectingTo(id);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setInjectingTo(null);
    alert(`Voice sample successfully injected to Android Device via virtual mic.`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-100">Voice Studio</h1>
        <p className="text-slate-400">Precision Speech Synthesis for IVI and Mobile Voice Assistants.</p>
      </header>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-6">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
              <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] px-1">Synthesis Payload</label>
              <textarea 
                value={voiceText}
                onChange={(e) => setVoiceText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-2xl p-6 min-h-[160px] text-lg font-medium text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/30 transition-all selection:bg-blue-600/40"
                placeholder="Enter text to synthesize..."
              />
              <div className="flex justify-between items-center bg-slate-800/20 p-2 rounded-2xl">
                 <div className="flex gap-2">
                    <button 
                      onClick={togglePreview}
                      disabled={isPreviewing}
                      className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/30 disabled:opacity-50"
                    >
                       {isPreviewing ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} fill="currentColor"/>}
                       {isPreviewing ? 'Synthesizing...' : 'Preview Audio'}
                    </button>
                    <button className="p-2.5 text-slate-400 hover:text-white bg-slate-800 rounded-xl border border-slate-700 transition-colors">
                       <Download size={20} />
                    </button>
                 </div>
                 <div className="pr-4 flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${voiceText.length > 0 ? 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]' : 'bg-slate-700'}`}></div>
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{voiceText.length} Characters</span>
                 </div>
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
              <h3 className="font-bold flex items-center gap-3 mb-6 text-slate-200 uppercase tracking-widest text-sm">
                 <div className="p-1.5 bg-blue-500/10 rounded-lg">
                  <Volume2 size={18} className="text-blue-400" />
                 </div>
                 Active Batch Library
              </h3>
              <div className="space-y-3">
                 {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-slate-800/30 rounded-2xl border border-slate-700/50 transition-all hover:bg-slate-800/60 hover:border-slate-600">
                       <button 
                        onClick={() => setActiveSample(activeSample === i ? null : i)}
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all shadow-lg ${activeSample === i ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'}`}
                       >
                          {activeSample === i ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
                       </button>
                       <div className="flex-1">
                          <p className="text-sm font-bold text-slate-200">VO_SAMPLE_0{i}.wav</p>
                          <div className="flex items-center gap-3 mt-0.5">
                             <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Female</span>
                             <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                             <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">US English</span>
                             <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                             <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">24-bit PCM</span>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button 
                            onClick={() => handleInject(i)}
                            disabled={injectingTo !== null}
                            className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 bg-blue-400/5 px-4 py-2 rounded-xl border border-blue-400/10 transition-all disabled:opacity-30"
                          >
                             {injectingTo === i ? <Loader2 size={12} className="animate-spin" /> : <Radio size={12} />}
                             {injectingTo === i ? 'Injecting' : 'Inject to Device'}
                          </button>
                       </div>
                    </div>
                 ))}
              </div>
           </div>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
           <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl">
              <h3 className="font-bold flex items-center gap-3 mb-8 text-slate-200 uppercase tracking-widest text-sm">
                 <div className="p-1.5 bg-purple-500/10 rounded-lg">
                  <Sliders size={18} className="text-purple-400" />
                 </div>
                 Voice Architect
              </h3>
              
              <div className="space-y-8">
                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><User size={14}/> Speaker Profile</label>
                    <select className="w-full bg-slate-800 border-slate-700 rounded-xl p-3 text-sm font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/30 transition-all">
                       <option>Adult Female (Serenity)</option>
                       <option>Adult Male (Adam)</option>
                       <option>Child (Timmy)</option>
                       <option>Senior (Walter)</option>
                       <option>Robotic (Beta-4)</option>
                    </select>
                 </div>

                 <div className="space-y-3">
                    <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2"><Globe size={14}/> Language Engine</label>
                    <select className="w-full bg-slate-800 border-slate-700 rounded-xl p-3 text-sm font-bold text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-600/30 transition-all">
                       <option>English (United States)</option>
                       <option>Chinese (Mandarin / Putonghua)</option>
                       <option>Chinese (Cantonese / Yue)</option>
                       <option>German (Standard)</option>
                       <option>Japanese (Tokyo)</option>
                    </select>
                 </div>

                 <div className="space-y-8 pt-4">
                    <div className="space-y-4">
                       <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          <span>Vocal Pitch</span>
                          <span className="text-purple-400">1.0x</span>
                       </div>
                       <input type="range" className="w-full accent-purple-600 h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer" />
                    </div>
                    <div className="space-y-4">
                       <div className="flex justify-between text-[10px] font-black text-slate-500 uppercase tracking-widest">
                          <span>Articulation Speed</span>
                          <span className="text-purple-400">1.15x</span>
                       </div>
                       <input type="range" className="w-full accent-purple-600 h-1.5 bg-slate-800 rounded-full appearance-none cursor-pointer" />
                    </div>
                 </div>
                 
                 <button className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-3 rounded-2xl border border-slate-700 transition-all mt-4">
                    Reset to Default
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
