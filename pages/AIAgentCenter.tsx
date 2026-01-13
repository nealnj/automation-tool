
import React, { useState } from 'react';
import { MessageSquare, Zap, Cpu, Code, Play, ArrowRight, Bot, Sparkles } from 'lucide-react';

export default function AIAgentCenter() {
  const [prompt, setPrompt] = useState('');

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4 py-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 border border-blue-500/20 rounded-full text-blue-400 font-bold text-xs uppercase tracking-widest shadow-lg shadow-blue-500/5">
           <Sparkles size={14} /> AI Agent Center (MCP Enabled)
        </div>
        <h1 className="text-5xl font-extrabold tracking-tight">Speak your test cases.</h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          Use natural language to describe automation flows. Our agent will generate scripts, 
          manage device connections, and execute tests automatically.
        </p>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-2 shadow-2xl">
         <div className="bg-slate-950 rounded-2xl p-6">
            <div className="flex items-start gap-4">
               <div className="p-3 bg-blue-600 rounded-2xl">
                  <Bot className="text-white" size={24} />
               </div>
               <div className="flex-1 space-y-4">
                  <div className="bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                     <p className="text-sm text-slate-300">
                        Hello! I am your OmniTest Intelligence Agent. <br/>
                        Tell me what you'd like to test today. For example: <br/>
                        <span className="text-blue-400 italic">"Write a test that opens the Settings app on Android, toggles Bluetooth, and verifies it's on via logs."</span>
                     </p>
                  </div>
                  
                  <div className="relative">
                     <textarea 
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Type your test description here..."
                        className="w-full bg-slate-900 border-2 border-slate-800 rounded-2xl p-4 pr-16 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:outline-none min-h-[120px] transition-all"
                     />
                     <button className="absolute bottom-4 right-4 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition-all">
                        <ArrowRight size={20} />
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
         {[
           { title: 'Flow Generation', desc: 'Auto-create complex multi-step agents.', icon: Zap, color: 'text-yellow-400' },
           { title: 'Script Refactoring', desc: 'Optimize legacy Python test scripts.', icon: Code, color: 'text-blue-400' },
           { title: 'Real-time Reasoning', desc: 'Solve test blocking issues on the fly.', icon: Cpu, color: 'text-purple-400' },
         ].map((card, i) => (
           <div key={i} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-all cursor-pointer group">
              <card.icon className={`${card.color} mb-4 group-hover:scale-110 transition-transform`} size={24} />
              <h3 className="font-bold text-white mb-2">{card.title}</h3>
              <p className="text-xs text-slate-500 leading-relaxed">{card.desc}</p>
           </div>
         ))}
      </div>
    </div>
  );
}
