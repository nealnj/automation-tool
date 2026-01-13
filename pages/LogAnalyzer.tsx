
import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Filter, Download, Trash2, Search, Play, Square, Settings, Pause } from 'lucide-react';

const LOG_LEVELS = ['VERBOSE', 'DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];

interface Log {
  id: number;
  time: string;
  level: string;
  tag: string;
  msg: string;
}

export default function LogAnalyzer() {
  const [logs, setLogs] = useState<Log[]>([
    { id: 1, time: '14:45:01.234', level: 'INFO', tag: 'ActivityManager', msg: 'Start proc 1234:com.android.camera/u0a125 for activity' },
    { id: 2, time: '14:45:01.350', level: 'DEBUG', tag: 'CameraService', msg: 'Connecting to camera hardware...' },
    { id: 3, time: '14:45:01.890', level: 'WARN', tag: 'Vsync', msg: 'Frame skipped (30ms). Possible UI thread jank.' },
    { id: 4, time: '14:45:02.105', level: 'ERROR', tag: 'PowerHAL', msg: 'Failed to set interaction hint: Permission denied' },
  ]);

  const [activeLevels, setActiveLevels] = useState<string[]>(['ERROR', 'WARN', 'INFO', 'DEBUG']);
  const [isStreaming, setIsStreaming] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const logEndRef = useRef<HTMLDivElement>(null);
  const streamTimer = useRef<any>(null);

  useEffect(() => {
    if (isStreaming) {
      streamTimer.current = setInterval(() => {
        const newLog: Log = {
          id: Date.now(),
          time: new Date().toLocaleTimeString('en-US', { hour12: false }) + '.' + Math.floor(Math.random() * 999).toString().padStart(3, '0'),
          level: LOG_LEVELS[Math.floor(Math.random() * LOG_LEVELS.length)],
          tag: ['WifiService', 'InputMethod', 'WindowMS', 'AppOps', 'NotificationS'][Math.floor(Math.random() * 5)],
          msg: [
            'Updating signal strength: -65dBm',
            'Broadcasting intent: android.net.wifi.STATE_CHANGE',
            'Focus moved to window: com.android.launcher',
            'Memory usage updated: 1.2GB/8.0GB',
            'System heartbeat: OK',
            'Service heartbeat: TIMEOUT',
            'ANR detected in process: com.google.chrome',
            'Permission granted: android.permission.CAMERA'
          ][Math.floor(Math.random() * 8)]
        };
        setLogs(prev => [...prev.slice(-499), newLog]);
      }, 1500);
    } else {
      if (streamTimer.current) clearInterval(streamTimer.current);
    }
    return () => {
      if (streamTimer.current) clearInterval(streamTimer.current);
    };
  }, [isStreaming]);

  useEffect(() => {
    if (logEndRef.current && isStreaming) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isStreaming]);

  const filteredLogs = logs.filter(log => {
    const matchesLevel = activeLevels.includes(log.level);
    const matchesSearch = log.msg.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          log.tag.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLevel && matchesSearch;
  });

  const toggleLevel = (level: string) => {
    setActiveLevels(prev => 
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Log Analyzer</h1>
          <p className="text-slate-400">Deep system diagnostic stream with keyword triggers.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-700 transition-all shadow-sm">
            <Settings size={18} />
            Configure Traps
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 transition-all">
            <Download size={18} />
            Export Buffer
          </button>
        </div>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl flex-1 flex flex-col overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-800 bg-slate-800/40 flex flex-wrap gap-4 items-center">
           <div className="flex items-center gap-2">
             <button 
               onClick={() => setIsStreaming(!isStreaming)}
               className={`p-2 rounded-xl transition-all shadow-md ${isStreaming ? 'bg-red-600/10 text-red-500 hover:bg-red-600/20' : 'bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600/20'}`}
             >
               {isStreaming ? <Pause size={18} fill="currentColor"/> : <Play size={18} fill="currentColor"/>}
             </button>
             <button onClick={() => setLogs([])} className="p-2 bg-slate-800 text-slate-400 hover:text-red-400 rounded-xl transition-colors border border-slate-700">
               <Trash2 size={18}/>
             </button>
           </div>
           
           <div className="h-8 w-px bg-slate-700 hidden sm:block"></div>
           
           <div className="flex gap-1.5 overflow-x-auto pb-1 sm:pb-0">
             {LOG_LEVELS.map(level => (
               <button 
                key={level}
                onClick={() => toggleLevel(level)}
                className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all whitespace-nowrap ${
                  activeLevels.includes(level) 
                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg' 
                    : 'bg-slate-800 border-slate-700 text-slate-500 hover:text-slate-300'
                }`}
               >
                 {level}
               </button>
             ))}
           </div>

           <div className="flex-1 min-w-[200px] relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
              <input 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter by keyword or component tag..." 
                className="w-full bg-slate-800/80 border-slate-700 border rounded-xl py-2 pl-12 pr-4 text-sm focus:ring-2 focus:ring-blue-600/50 focus:outline-none transition-all placeholder:text-slate-600 text-slate-200" 
              />
           </div>
        </div>

        {/* Log Stream */}
        <div className="flex-1 overflow-y-auto font-mono text-xs bg-slate-950 p-0 selection:bg-blue-600/30">
           <table className="w-full border-collapse">
              <thead className="sticky top-0 bg-slate-900/95 backdrop-blur-md text-slate-500 text-left z-10 shadow-sm">
                 <tr className="border-b border-slate-800">
                    <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px] w-40">Timestamp</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px] w-24">Level</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px] w-48">Tag</th>
                    <th className="px-4 py-3 font-bold uppercase tracking-widest text-[10px]">Message</th>
                 </tr>
              </thead>
              <tbody className="divide-y divide-slate-900/50">
                 {filteredLogs.map(log => (
                   <tr key={log.id} className={`group hover:bg-slate-900/60 transition-colors ${
                     log.level === 'ERROR' || log.level === 'FATAL' ? 'text-red-400 bg-red-400/5' : 
                     log.level === 'WARN' ? 'text-yellow-400 bg-yellow-400/5' : 
                     'text-slate-400'
                   }`}>
                      <td className="px-4 py-2.5 align-top font-medium opacity-60 tabular-nums">{log.time}</td>
                      <td className="px-4 py-2.5 align-top">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${
                          log.level === 'ERROR' ? 'border-red-500/30' : 
                          log.level === 'WARN' ? 'border-yellow-500/30' : 
                          'border-slate-700/50'
                        }`}>
                          {log.level}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 align-top font-bold text-blue-400/80 group-hover:text-blue-400 truncate max-w-[12rem]">{log.tag}</td>
                      <td className="px-4 py-2.5 align-top break-all text-slate-300 group-hover:text-white transition-colors">{log.msg}</td>
                   </tr>
                 ))}
                 <div ref={logEndRef} />
              </tbody>
           </table>
           
           {filteredLogs.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-slate-700 space-y-4 py-20">
                <Terminal size={64} className="opacity-20" />
                <p className="text-sm font-bold uppercase tracking-widest opacity-40">No matching logs in buffer</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
