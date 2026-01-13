
import React, { useState, useEffect, useRef } from 'react';
import { Smartphone, Play, Square, Save, RotateCcw, Camera, List, Trash2, Clock, PlayCircle } from 'lucide-react';

export default function DeviceMirroring() {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedSteps, setRecordedSteps] = useState<string[]>([]);
  const [selectedDevice, setSelectedDevice] = useState('Xiaomi 13 Ultra');
  const [playbackIndex, setPlaybackIndex] = useState(-1);
  const recordingStartTime = useRef<number>(0);

  const addStep = (action: string) => {
    if (isRecording) {
      const timeOffset = ((Date.now() - recordingStartTime.current) / 1000).toFixed(2);
      setRecordedSteps(prev => [...prev, `[T+${timeOffset}s] ${action}`]);
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    recordingStartTime.current = Date.now();
    setRecordedSteps([]);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const simulatePlayback = async () => {
    if (recordedSteps.length === 0) return;
    setIsPlaying(true);
    for (let i = 0; i < recordedSteps.length; i++) {
      setPlaybackIndex(i);
      await new Promise(resolve => setTimeout(resolve, 800));
    }
    setPlaybackIndex(-1);
    setIsPlaying(false);
  };

  const handleScreenClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);
    addStep(`CLICK at (${x}, ${y})`);
  };

  return (
    <div className="grid grid-cols-12 gap-8 h-[calc(100vh-160px)]">
      {/* Mirroring Panel */}
      <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl flex-1 relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
            <div className="flex items-center gap-3">
              <Smartphone className="text-blue-400" />
              <span className="font-bold text-slate-200">{selectedDevice}</span>
              {isPlaying && (
                <span className="flex items-center gap-2 text-xs text-emerald-400 font-bold animate-pulse">
                  <PlayCircle size={14} /> PLAYBACK ACTIVE
                </span>
              )}
            </div>
            <div className="flex gap-2">
              {!isRecording ? (
                <button 
                  onClick={startRecording}
                  disabled={isPlaying}
                  className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-1.5 rounded-lg font-medium text-sm transition-all border border-slate-700 disabled:opacity-50"
                >
                  <Play size={16} /> Start Recording
                </button>
              ) : (
                <button 
                  onClick={stopRecording}
                  className="flex items-center gap-2 bg-red-600 text-white px-4 py-1.5 rounded-lg font-medium text-sm transition-all animate-pulse shadow-lg shadow-red-900/20"
                >
                  <Square size={16} /> Stop Recording
                </button>
              )}
              <button 
                onClick={() => alert("Screenshot saved to /gallery/capture_" + Date.now() + ".jpg")}
                className="p-1.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-lg border border-slate-700"
              >
                <Camera size={18} />
              </button>
            </div>
          </div>
          
          <div 
            className="flex-1 bg-black flex items-center justify-center relative cursor-crosshair group" 
            onClick={handleScreenClick}
          >
             <img 
               src="https://picsum.photos/seed/phone/400/800" 
               alt="Screen Mirror" 
               className={`h-[90%] w-auto rounded-3xl border-8 border-slate-800 transition-opacity ${isPlaying ? 'opacity-80' : 'opacity-100'}`}
             />
             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/40 transition-opacity pointer-events-none">
                <span className="text-white bg-blue-600 px-3 py-1 rounded-full text-xs font-bold shadow-lg">Click to Record Step</span>
             </div>
             {playbackIndex !== -1 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-2xl border border-emerald-400 animate-bounce">
                  Executing: {recordedSteps[playbackIndex].split('] ')[1]}
                </div>
             )}
          </div>

          <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex justify-center gap-8 shadow-inner">
             <button className="text-slate-500 hover:text-white transition-colors" onClick={() => addStep('COMMAND: BACK')} title="Back"><RotateCcw size={20}/></button>
             <button className="text-slate-500 hover:text-white transition-colors" onClick={() => addStep('COMMAND: HOME')} title="Home"><Smartphone size={20}/></button>
             <button className="text-slate-500 hover:text-white transition-colors" onClick={() => addStep('COMMAND: RECENTS')} title="Recents"><List size={20}/></button>
          </div>
        </div>
      </div>

      {/* Steps Panel */}
      <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl flex-1 flex flex-col overflow-hidden shadow-xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
            <h3 className="font-bold flex items-center gap-2 text-slate-200">
              <Clock size={18} className="text-blue-400" />
              Recorded Session {recordedSteps.length > 0 && `(${recordedSteps.length})`}
            </h3>
            <div className="flex gap-2">
              <button 
                onClick={simulatePlayback}
                disabled={isRecording || recordedSteps.length === 0 || isPlaying}
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-30 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-lg"
              >
                <PlayCircle size={14} /> Replay
              </button>
              <button 
                onClick={() => setRecordedSteps([])}
                className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-slate-950/30">
            {recordedSteps.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 opacity-60">
                <List size={48} className="mb-2" />
                <p className="text-sm font-medium">Capture Queue Empty</p>
                <p className="text-xs">Actions will appear here during recording.</p>
              </div>
            ) : (
              recordedSteps.map((step, idx) => (
                <div 
                  key={idx} 
                  className={`p-3 rounded-xl border transition-all text-xs mono flex justify-between items-center group ${
                    playbackIndex === idx 
                      ? 'bg-emerald-600/20 border-emerald-500 text-emerald-300 scale-[1.02]' 
                      : 'bg-slate-800/40 border-slate-700/50 text-slate-400 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] text-slate-500">{idx + 1}</span>
                    <span>{step}</span>
                  </div>
                  {playbackIndex === idx && <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></div>}
                </div>
              ))
            )}
          </div>
          
          <div className="p-4 border-t border-slate-800 bg-slate-800/20">
             <button className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20">
                <Save size={16} /> Save to Reusable Suite
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}
