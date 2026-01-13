
import React, { useState } from 'react';
// Fix: Added missing Activity import
import { Camera, Scan, Maximize2, Settings, ShieldCheck, Box, Type, Palette, Video, Activity } from 'lucide-react';

export default function ComputerVision() {
  const [detectionModes, setDetectionModes] = useState(['Text', 'Object']);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Computer Vision Center</h1>
          <p className="text-slate-400">External device monitoring with AI result judgment.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm font-medium border border-slate-700 transition-all">
            <Video size={18} />
            Recording History
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Main Feed */}
        <div className="col-span-12 lg:col-span-8">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden aspect-video relative group">
              <img 
                src="https://picsum.photos/seed/testing/1280/720" 
                alt="External Monitor Feed" 
                className="w-full h-full object-cover"
              />
              
              {/* Overlays (Simulated) */}
              <div className="absolute top-20 left-40 w-48 h-20 border-2 border-emerald-500 rounded-lg flex flex-col">
                 <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 self-start rounded-br">TEXT: Welcome Home</span>
              </div>
              <div className="absolute bottom-40 right-60 w-32 h-32 border-2 border-blue-500 rounded-full flex items-center justify-center">
                 <span className="bg-blue-500 text-white text-[10px] font-bold px-1.5 rounded-full absolute -top-2">ICON: Settings</span>
              </div>

              {/* Status Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6 pointer-events-none">
                 <div className="flex items-center gap-4 w-full">
                    <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-700">
                       <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                       <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">LIVE: CAM_01</span>
                    </div>
                    <div className="flex-1"></div>
                    <div className="flex items-center gap-3">
                       <button className="pointer-events-auto p-2 bg-slate-800 hover:bg-slate-700 text-white rounded-full transition-all">
                          <Maximize2 size={18} />
                       </button>
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Vision Config */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                 <Scan size={18} className="text-blue-400" />
                 Detection Engines
              </h3>
              <div className="space-y-3">
                 {[
                   { name: 'OCR / Text Recognition', icon: Type, color: 'text-blue-400' },
                   { name: 'Object / Icon Detection', icon: Box, color: 'text-purple-400' },
                   { name: 'Color Analysis', icon: Palette, color: 'text-pink-400' },
                   { name: 'Motion Trigger', icon: Activity, color: 'text-orange-400' },
                 ].map(engine => (
                   <label key={engine.name} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 hover:bg-slate-800 transition-colors cursor-pointer">
                      <div className="flex items-center gap-3">
                         <engine.icon size={18} className={engine.color} />
                         <span className="text-sm font-medium">{engine.name}</span>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded border-slate-600 bg-slate-900 text-blue-600" />
                   </label>
                 ))}
              </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                 <ShieldCheck size={18} className="text-emerald-400" />
                 Automated Verdicts
              </h3>
              <div className="space-y-4">
                 <div className="p-3 bg-emerald-600/10 border border-emerald-600/20 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-emerald-500 mb-1">Pass Criterion</p>
                    <p className="text-xs text-slate-300">Detect "Dashboard" icon within 3 seconds of navigation.</p>
                 </div>
                 <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">Failure Criterion</p>
                    <p className="text-xs text-slate-300">Screen remains "Black" for more than 500ms.</p>
                 </div>
                 <button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-2 rounded-xl text-sm border border-slate-700 transition-all">
                   Configure Rules
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
