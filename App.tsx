
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Monitor, Smartphone, Cpu, Activity, Code, Database, 
  Camera, Mic, Terminal, Settings, Play, BookOpen, 
  Layers, MessageSquare, Zap, HardDrive, BarChart, 
  ClipboardList, AlertTriangle, TrendingUp
} from 'lucide-react';

import Dashboard from './pages/Dashboard';
import DeviceMirroring from './pages/DeviceMirroring';
import ScriptingStudio from './pages/ScriptingStudio';
import CanBusHub from './pages/CanBusHub';
import LogAnalyzer from './pages/LogAnalyzer';
import ComputerVision from './pages/ComputerVision';
import AIAgentCenter from './pages/AIAgentCenter';
import VoiceStudio from './pages/VoiceStudio';
import TrainingCenter from './pages/TrainingCenter';
import JiraRegression from './pages/JiraRegression';
import PerformanceLogs from './pages/PerformanceLogs';
import ResourceMonitor from './pages/ResourceMonitor';

// Fix: Added key property to NavItem props type definition to resolve TypeScript error when passing key prop in a list.
const NavItem = ({ to, icon: Icon, label, active }: { to: string, icon: any, label: string, active: boolean, key?: string }) => (
  <Link
    to={to}
    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
      active 
        ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
    }`}
  >
    <Icon size={20} />
    <span className="font-medium text-sm">{label}</span>
  </Link>
);

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuGroups = [
    {
      label: 'Core Controls',
      items: [
        { path: '/', label: 'Dashboard', icon: Monitor },
        { path: '/mirroring', label: 'Screen Mirroring', icon: Smartphone },
        { path: '/scripting', label: 'Script Studio', icon: Code },
      ]
    },
    {
      label: 'Hardware & Bus',
      items: [
        { path: '/canbus', label: 'CAN Bus Hub', icon: Activity },
        { path: '/vision', label: 'Computer Vision', icon: Camera },
        { path: '/resources', label: 'Resource Monitor', icon: HardDrive },
      ]
    },
    {
      label: 'Diagnostics & Data',
      items: [
        { path: '/logs', label: 'Log Analyzer', icon: Terminal },
        { path: '/perf-logs', label: 'Advanced Analytics', icon: TrendingUp },
        { path: '/voice', label: 'Voice Test Studio', icon: Mic },
      ]
    },
    {
      label: 'Intelligence & Ops',
      items: [
        { path: '/jira', label: 'JIRA Regression', icon: ClipboardList },
        { path: '/ai-agent', label: 'AI Agent (MCP)', icon: Zap },
        { path: '/training', label: 'Training Center', icon: BookOpen },
      ]
    }
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen fixed left-0 top-0 z-50">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">O</div>
        <div>
          <h1 className="text-lg font-bold text-white leading-tight">OmniTest</h1>
          <p className="text-xs text-slate-500">v3.5 Enterprise</p>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-6 overflow-y-auto">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <p className="px-4 mb-2 text-[10px] uppercase font-bold tracking-wider text-slate-600">
              {group.label}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavItem 
                  key={item.path} 
                  to={item.path} 
                  icon={item.icon} 
                  label={item.label} 
                  active={currentPath === item.path} 
                />
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-4 py-2 text-slate-400 hover:text-white cursor-pointer">
          <Settings size={20} />
          <span className="text-sm">Settings</span>
        </div>
      </div>
    </aside>
  );
};

export default function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 ml-64 p-8 bg-slate-950 overflow-x-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/mirroring" element={<DeviceMirroring />} />
            <Route path="/scripting" element={<ScriptingStudio />} />
            <Route path="/canbus" element={<CanBusHub />} />
            <Route path="/logs" element={<LogAnalyzer />} />
            <Route path="/vision" element={<ComputerVision />} />
            <Route path="/ai-agent" element={<AIAgentCenter />} />
            <Route path="/voice" element={<VoiceStudio />} />
            <Route path="/training" element={<TrainingCenter />} />
            <Route path="/jira" element={<JiraRegression />} />
            <Route path="/perf-logs" element={<PerformanceLogs />} />
            <Route path="/resources" element={<ResourceMonitor />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}
