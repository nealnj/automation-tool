
import React from 'react';
import { TrendingUp, AlertTriangle, Zap, Search, Download, BarChart2, CheckCircle, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie } from 'recharts';

const errorTrend = [
  { name: '08:00', errors: 12, warnings: 45 },
  { name: '10:00', errors: 45, warnings: 89 },
  { name: '12:00', errors: 23, warnings: 67 },
  { name: '14:00', errors: 67, warnings: 120 },
  { name: '16:00', errors: 34, warnings: 56 },
  { name: '18:00', errors: 15, warnings: 34 },
];

const distribution = [
  { name: 'System Crash', value: 400 },
  { name: 'ANR (Not Responding)', value: 300 },
  { name: 'Resource Overload', value: 300 },
  { name: 'Permission Denied', value: 200 },
];

const COLORS = ['#ef4444', '#f59e0b', '#3b82f6', '#10b981'];

export default function PerformanceLogs() {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Advanced Log Analytics</h1>
          <p className="text-slate-400">Deep analysis of system logs, bottlenecks, and performance optimization.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-sm border border-slate-700">
            <Download size={18} />
            Generate PDF Report
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6">
        {/* KPI Row */}
        <div className="col-span-12 grid grid-cols-4 gap-6">
          {[
            { label: 'Error Density', value: '2.4 / hr', change: '-12%', icon: AlertTriangle, color: 'text-red-400' },
            { label: 'Boot Time', value: '18.4s', change: '+0.5s', icon: Zap, color: 'text-yellow-400' },
            { label: 'FPS Stability', value: '98.2%', change: '+2.1%', icon: TrendingUp, color: 'text-emerald-400' },
            { label: 'Log Verbosity', value: '1.2 GB/d', change: 'Stable', icon: Info, color: 'text-blue-400' },
          ].map((kpi, i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 p-5 rounded-2xl">
              <div className="flex justify-between items-start mb-2">
                <kpi.icon className={kpi.color} size={20} />
                <span className={`text-[10px] font-bold ${kpi.change.startsWith('+') ? 'text-red-400' : 'text-emerald-400'}`}>
                  {kpi.change}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-bold uppercase">{kpi.label}</p>
              <p className="text-xl font-bold text-white">{kpi.value}</p>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6">
           <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-300">
              <BarChart2 size={18} className="text-blue-400" />
              Hourly Error & Warning Distribution
           </h3>
           <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={errorTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                    <XAxis dataKey="name" stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <YAxis stroke="#475569" fontSize={10} axisLine={false} tickLine={false} />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                    />
                    <Bar dataKey="errors" fill="#ef4444" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="warnings" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                 </BarChart>
              </ResponsiveContainer>
           </div>
        </div>

        <div className="col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6">
           <h3 className="font-bold flex items-center gap-2 mb-6 text-slate-300">
              <BarChart2 size={18} className="text-purple-400" />
              Incident Categories
           </h3>
           <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                 <PieChart>
                    <Pie
                       data={distribution}
                       cx="50%"
                       cy="50%"
                       innerRadius={60}
                       outerRadius={80}
                       paddingAngle={5}
                       dataKey="value"
                    >
                       {distribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                       ))}
                    </Pie>
                    <Tooltip />
                 </PieChart>
              </ResponsiveContainer>
           </div>
        </div>

        {/* Optimization Insights */}
        <div className="col-span-12 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
           <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-blue-600/5">
              <h3 className="font-bold flex items-center gap-2">
                 <Zap size={18} className="text-yellow-400" />
                 AI-Detected Optimization Opportunities
              </h3>
           </div>
           <div className="p-6 grid grid-cols-2 gap-6">
              {[
                { title: 'Redundant Logcat Calls', impact: 'High', desc: 'The Navigation service is writing verbose logs every 10ms. Recommended reduction in log level.', action: 'Apply Filter' },
                { title: 'CPU Wake Lock Leak', impact: 'Medium', desc: 'Wakelock "McuCommHandler" held for 4.2s after task completion. Possible battery drain.', action: 'Auto-Fix Script' },
              ].map((item, i) => (
                <div key={i} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 hover:border-blue-500/50 transition-all">
                   <div className="flex justify-between mb-2">
                      <span className="text-sm font-bold">{item.title}</span>
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 text-red-500">IMPACT: {item.impact}</span>
                   </div>
                   <p className="text-xs text-slate-400 mb-4">{item.desc}</p>
                   <button className="text-xs font-bold text-blue-400 hover:text-white transition-colors flex items-center gap-1">
                      {item.action} <CheckCircle size={12}/>
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
