
import React, { useState, useEffect } from 'react';
import { HardDrive, Cpu, Activity, Zap, ShieldCheck, ShieldAlert, Settings, Download, Loader2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const ThresholdCard = ({ label, value, unit, icon: Icon, status, limit }: any) => (
  <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl relative overflow-hidden group shadow-xl transition-all hover:border-slate-700">
    <div className={`absolute top-0 right-0 w-24 h-24 -mt-10 -mr-10 opacity-5 transition-transform group-hover:scale-125`}>
       <Icon size={96} />
    </div>
    <div className="flex justify-between items-start mb-4">
       <div className="p-3 bg-slate-800 rounded-2xl border border-slate-700/50">
          <Icon className="text-slate-300" size={20} />
       </div>
       <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
          status === 'Pass' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
       }`}>
          {status === 'Pass' ? <ShieldCheck size={12}/> : <ShieldAlert size={12}/>}
          {status}
       </div>
    </div>
    <h3 className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">{label} Utilization</h3>
    <div className="mt-2 flex items-baseline gap-2">
       <span className="text-4xl font-black text-slate-100 tabular-nums">{value}</span>
       <span className="text-slate-500 font-bold">{unit}</span>
    </div>
    <div className="mt-5 w-full bg-slate-800 h-2 rounded-full overflow-hidden shadow-inner">
       <div 
          className={`h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(0,0,0,0.5)] ${status === 'Pass' ? 'bg-gradient-to-r from-blue-600 to-blue-400' : 'bg-gradient-to-r from-red-600 to-red-400'}`} 
          style={{ width: `${value}%` }}
       ></div>
    </div>
    <div className="mt-3 flex justify-between items-center">
      <p className="text-[10px] text-slate-500 font-bold uppercase">Target: &lt; {limit}{unit}</p>
      <p className={`text-[10px] font-black ${status === 'Pass' ? 'text-emerald-500' : 'text-red-500'}`}>
        {status === 'Pass' ? 'NOMINAL' : 'THRESHOLD EXCEEDED'}
      </p>
    </div>
  </div>
);

export default function ResourceMonitor() {
  const [selectedStandard, setSelectedStandard] = useState('Automotive Grade A');
  const [liveData, setLiveData] = useState<any[]>([]);
  const [currentMetrics, setCurrentMetrics] = useState({ cpu: 42, gpu: 88, mem: 56, npu: 12 });

  useEffect(() => {
    // Generate initial data
    const initial = Array.from({ length: 30 }, (_, i) => ({
      time: i,
      cpu: 30 + Math.random() * 20,
      gpu: 70 + Math.random() * 20,
      mem: 50 + Math.random() * 10,
      npu: 10 + Math.random() * 10
    }));
    setLiveData(initial);

    const interval = setInterval(() => {
      setLiveData(prev => {
        const last = prev[prev.length - 1];
        const next = {
          time: last.time + 1,
          cpu: Math.max(10, Math.min(95, last.cpu + (Math.random() - 0.5) * 8)),
          gpu: Math.max(10, Math.min(95, last.gpu + (Math.random() - 0.5) * 12)),
          mem: Math.max(10, Math.min(95, last.mem + (Math.random() - 0.5) * 2)),
          npu: Math.max(10, Math.min(95, last.npu + (Math.random() - 0.5) * 5)),
        };
        setCurrentMetrics({
          cpu: Math.round(next.cpu),
          gpu: Math.round(next.gpu),
          mem: Math.round(next.mem),
          npu: Math.round(next.npu)
        });
        return [...prev.slice(1), next];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Hardware Diagnostics</h1>
          <p className="text-slate-400">Deep telemetry for CPU, GPU, and NPU computational units.</p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-3 bg-slate-900 border border-slate-800 px-4 py-1.5 rounded-2xl shadow-inner">
             <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Profile:</span>
             <select 
               value={selectedStandard}
               onChange={(e) => setSelectedStandard(e.target.value)}
               className="bg-transparent text-xs font-bold text-blue-400 focus:outline-none border-none p-0 cursor-pointer hover:text-blue-300 transition-colors"
             >
                <option>Automotive Grade A</option>
                <option>High Performance Mobile</option>
                <option>IoT Low Power Node</option>
             </select>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-2xl text-sm font-bold shadow-lg shadow-blue-900/20 transition-all">
             <Download size={18} />
             Telemetry Export
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         <ThresholdCard label="CPU" value={currentMetrics.cpu} unit="%" icon={Cpu} status={currentMetrics.cpu < 80 ? "Pass" : "Fail"} limit={80} />
         <ThresholdCard label="GPU" value={currentMetrics.gpu} unit="%" icon={Activity} status={currentMetrics.gpu < 75 ? "Pass" : "Fail"} limit={75} />
         <ThresholdCard label="Memory" value={currentMetrics.mem} unit="%" icon={HardDrive} status={currentMetrics.mem < 90 ? "Pass" : "Fail"} limit={90} />
         <ThresholdCard label="NPU" value={currentMetrics.npu} unit="%" icon={Zap} status={currentMetrics.npu < 50 ? "Pass" : "Fail"} limit={50} />
      </div>

      <div className="grid grid-cols-1 gap-6">
         <div className="bg-slate-900 border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden relative group">
            <div className="flex justify-between items-center mb-10">
               <div className="space-y-1">
                  <h3 className="text-xl font-bold flex items-center gap-3 text-slate-100">
                     <Activity size={24} className="text-blue-500 animate-pulse" />
                     Live Computational Heatmap
                  </h3>
                  <p className="text-xs text-slate-500 font-medium ml-9">High-frequency sampling @ 1000ms</p>
               </div>
               <div className="flex gap-8 px-6 py-2 bg-slate-800/50 rounded-2xl border border-slate-700/50 backdrop-blur-sm">
                  <span className="flex items-center gap-2.5 text-[10px] font-black text-slate-400">
                    <div className="w-3 h-3 rounded bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div> CPU
                  </span>
                  <span className="flex items-center gap-2.5 text-[10px] font-black text-slate-400">
                    <div className="w-3 h-3 rounded bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"></div> GPU
                  </span>
                  <span className="flex items-center gap-2.5 text-[10px] font-black text-slate-400">
                    <div className="w-3 h-3 rounded bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> MEM
                  </span>
                  <span className="flex items-center gap-2.5 text-[10px] font-black text-slate-400">
                    <div className="w-3 h-3 rounded bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]"></div> NPU
                  </span>
               </div>
            </div>
            <div className="h-80 -mx-4">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={liveData}>
                     <defs>
                        <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorGpu" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#ef4444" stopOpacity={0.1}/>
                           <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                     <XAxis dataKey="time" hide />
                     <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} width={30} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #334155', borderRadius: '16px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)' }}
                        itemStyle={{ fontSize: '11px', fontWeight: 'bold' }}
                     />
                     <Area type="monotone" dataKey="cpu" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={3} isAnimationActive={false} />
                     <Area type="monotone" dataKey="gpu" stroke="#ef4444" fillOpacity={1} fill="url(#colorGpu)" strokeWidth={3} isAnimationActive={false} />
                     <Area type="monotone" dataKey="mem" stroke="#10b981" fillOpacity={0} strokeWidth={2} isAnimationActive={false} />
                     <Area type="monotone" dataKey="npu" stroke="#a855f7" fillOpacity={0} strokeWidth={2} isAnimationActive={false} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
           <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-500/10 rounded-xl">
                <ShieldCheck size={20} className="text-blue-400" />
              </div>
              <h3 className="font-bold text-slate-100 uppercase tracking-widest text-sm">Automotive Standard Audit</h3>
           </div>
           <div className="space-y-3">
              {[
                { name: 'GPU Thermal Threshold Test', detail: '4K H.265 Render @ 60fps', status: 'FAILED', val: '88%', color: 'text-red-400' },
                { name: 'Memory Leaks (Heap Audit)', detail: '100 Application Launch Cycles', status: 'PASSED', val: 'NOMINAL', color: 'text-emerald-400' },
                { name: 'NPU Latency Consistency', detail: 'Inference model v3.4 @ INT8', status: 'PASSED', val: '14ms avg', color: 'text-emerald-400' },
              ].map((test, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-slate-950/50 rounded-2xl border border-slate-800 transition-colors hover:bg-slate-950">
                   <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-200">{test.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium uppercase tracking-tighter">{test.detail}</p>
                   </div>
                   <div className="text-right">
                      <p className={`text-[10px] font-black ${test.color}`}>{test.status}</p>
                      <p className="text-xs font-bold text-slate-400">{test.val}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col items-center justify-center text-center space-y-4">
           <div className="w-16 h-16 bg-blue-600/10 rounded-full flex items-center justify-center text-blue-400 shadow-inner">
             <Settings size={32} className="animate-spin-slow" />
           </div>
           <h3 className="text-lg font-bold">Standard Benchmarking</h3>
           <p className="text-sm text-slate-400 max-w-xs">Run a comprehensive hardware stress test to compare your system against global automotive and mobile standards.</p>
           <button className="bg-slate-800 hover:bg-slate-700 text-white px-8 py-2.5 rounded-2xl font-bold border border-slate-700 transition-all">
             Start Full Diagnostic
           </button>
        </div>
      </div>
    </div>
  );
}
