
import React, { useState } from 'react';
import { Database, Upload, Play, Send, Activity, Info, BarChart3, Settings2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const dummyData = Array.from({ length: 20 }, (_, i) => ({
  time: i,
  speed: 40 + Math.random() * 60,
  rpm: 2000 + Math.random() * 3000
}));

export default function CanBusHub() {
  const [activeMatrix, setActiveMatrix] = useState('Model_Y_Chassis.dbc');
  const [signals] = useState([
    { id: '0x101', name: 'WheelSpeed_FL', value: 45.2, unit: 'km/h' },
    { id: '0x102', name: 'SteeringAngle', value: 12.5, unit: 'deg' },
    { id: '0x205', name: 'EngineRPM', value: 2450, unit: 'rpm' },
    { id: '0x310', name: 'BatteryTemp', value: 32.1, unit: '°C' },
  ]);

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold">CAN Bus Hub</h1>
          <p className="text-slate-400">DBC Analysis and CAN/CANFD Signal Monitoring</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm border border-slate-700">
            <Upload size={18} />
            Import DBC / Excel
          </button>
          <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg">
            <Activity size={18} />
            Live Trace
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* Matrix & Signals */}
        <div className="col-span-4 flex flex-col gap-6">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
             <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Active Matrix</h3>
             <div className="flex items-center gap-3 p-3 bg-slate-800/50 rounded-xl border border-slate-700">
                <Database className="text-blue-400" />
                <div>
                   <p className="text-sm font-medium">{activeMatrix}</p>
                   <p className="text-[10px] text-slate-500">1,204 Messages • 4,821 Signals</p>
                </div>
             </div>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-2xl flex flex-col flex-1 overflow-hidden">
             <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/20">
                <h3 className="font-bold text-sm">Signal Watchlist</h3>
                <Settings2 size={16} className="text-slate-500 cursor-pointer" />
             </div>
             <div className="p-2 space-y-1">
                {signals.map(s => (
                  <div key={s.id} className="flex justify-between items-center p-3 hover:bg-slate-800 rounded-xl transition-colors">
                     <div>
                        <p className="text-xs font-mono text-slate-500">{s.id}</p>
                        <p className="text-sm font-medium">{s.name}</p>
                     </div>
                     <div className="text-right">
                        <p className="text-lg font-bold text-blue-400">{s.value}</p>
                        <p className="text-[10px] text-slate-500">{s.unit}</p>
                     </div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Chart & Sender */}
        <div className="col-span-8 flex flex-col gap-6">
           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 h-80">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold flex items-center gap-2">
                   <BarChart3 size={18} className="text-purple-400" />
                   Real-time Visualization
                </h3>
                <div className="flex gap-4 text-xs">
                   <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-500"></div> Speed</span>
                   <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> RPM</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height="80%">
                <LineChart data={dummyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="time" hide />
                  <YAxis stroke="#475569" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Line type="monotone" dataKey="speed" stroke="#3b82f6" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="rpm" stroke="#a855f7" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
           </div>

           <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="font-bold flex items-center gap-2 mb-4">
                 <Send size={18} className="text-emerald-400" />
                 CAN / CANFD Generator
              </h3>
              <div className="grid grid-cols-4 gap-4">
                 <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 font-bold uppercase">Message ID</label>
                    <input className="bg-slate-800 border-slate-700 rounded-lg p-2 text-sm font-mono" placeholder="0x123" />
                 </div>
                 <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 font-bold uppercase">DLC / Length</label>
                    <input className="bg-slate-800 border-slate-700 rounded-lg p-2 text-sm font-mono" placeholder="8" />
                 </div>
                 <div className="col-span-2 flex flex-col gap-1.5">
                    <label className="text-xs text-slate-500 font-bold uppercase">Data (HEX)</label>
                    <input className="bg-slate-800 border-slate-700 rounded-lg p-2 text-sm font-mono" placeholder="FF 00 12 34 56 78 AB CD" />
                 </div>
              </div>
              <div className="mt-4 flex justify-between items-center">
                 <div className="flex gap-4">
                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                       <input type="checkbox" className="rounded bg-slate-800" /> Cyclic Send (100ms)
                    </label>
                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                       <input type="checkbox" className="rounded bg-slate-800" /> CAN FD
                    </label>
                 </div>
                 <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2 rounded-xl transition-all shadow-lg shadow-emerald-900/20">
                    Transmit
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
