
import React, { useState } from 'react';
import { ClipboardList, Download, Search, RefreshCcw, Zap, CheckCircle, Code, FileText, Loader2, Sparkles, ExternalLink } from 'lucide-react';

export default function JiraRegression() {
  const [issues, setIssues] = useState([
    { id: 'OMNI-1042', title: 'CarPlay disconnection on highway tunnel exit', priority: 'Critical', status: 'Ready for Test', category: 'Connectivity', desc: 'User reported intermittent connection loss when exiting tunnels. Log investigation shows a heartbeat timeout in the infotainment service. Regression script should simulate high latency and signal loss recovery.' },
    { id: 'OMNI-981', title: 'System Settings app crash on Bluetooth toggle', priority: 'High', status: 'In Review', category: 'Core App', desc: 'Rapidly toggling Bluetooth on/off 5 times causes the Settings application to throw a NullPointerException in the BluetoothManager class.' },
    { id: 'OMNI-1105', title: 'Memory leak in Navigation background task', priority: 'Medium', status: 'Backlog', category: 'Performance', desc: 'Leaving Navigation running in background for >4 hours results in 500MB+ heap growth. Possible leak in location polling loop.' },
  ]);

  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);

  const syncJira = async () => {
    setIsSyncing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSyncing(false);
    alert("JIRA database synchronized. No new issues found.");
  };

  const generateScript = async () => {
    setIsGenerating(true);
    setGeneratedScript(null);
    
    // Simulation logic based on issue category
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    let script = "";
    if (selectedIssue.id === 'OMNI-1042') {
      script = `import omnitest_sdk as ot\nfrom devices import car_head_unit\n\n# Regression for OMNI-1042: CarPlay Recovery\ndef test_tunnel_exit_recovery():\n    unit = car_head_unit.connect()\n    print("Simulating signal loss...")\n    unit.set_signal_strength(0)\n    ot.sleep(5)\n    \n    print("Restoring signal...")\n    unit.set_signal_strength(100)\n    \n    # Validate service heartbeat\n    assert unit.get_service_status("CarPlay") == "ACTIVE"`;
    } else if (selectedIssue.id === 'OMNI-981') {
      script = `import uiautomator2 as u2\nimport time\n\n# Regression for OMNI-981: BT Toggle Stress\ndef test_bt_toggle_crash():\n    d = u2.connect()\n    d.app_start("com.android.settings")\n    d(text="Bluetooth").click()\n    \n    for i in range(5):\n        print(f"Toggle cycle {i+1}")\n        d(resourceId="android:id/switch_widget").click()\n        time.sleep(0.5)\n        \n    # Check if process is alive\n    assert d.app_wait("com.android.settings", timeout=2.0)`;
    } else {
      script = `# Mock script generated for ${selectedIssue.id}\ndef test_generic_regression():\n    print("Executing automated steps for ${selectedIssue.title}")\n    pass`;
    }
    
    setGeneratedScript(script);
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-100">Regression Hub</h1>
          <p className="text-slate-400">Transform JIRA bug reports into verified automation scripts.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-700 transition-all">
            <Download size={18} />
            Connect Instance
          </button>
          <button 
            onClick={syncJira}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/20 transition-all"
          >
            {isSyncing ? <Loader2 size={18} className="animate-spin" /> : <RefreshCcw size={18} />}
            {isSyncing ? 'Syncing...' : 'Fetch Issues'}
          </button>
        </div>
      </header>

      <div className="grid grid-cols-12 gap-6 h-[calc(100vh-220px)]">
        {/* Issue List */}
        <div className="col-span-12 lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl flex flex-col overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-slate-800 bg-slate-800/30">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input placeholder="Search JIRA keys, titles or tags..." className="w-full bg-slate-800/80 border-slate-700 border rounded-xl pl-12 py-2 text-sm focus:ring-2 focus:ring-blue-600/50 focus:outline-none transition-all" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/50 bg-slate-950/20">
            {issues.map(issue => (
              <div 
                key={issue.id} 
                onClick={() => { setSelectedIssue(issue); setGeneratedScript(null); }}
                className={`p-5 cursor-pointer transition-all relative group ${selectedIssue?.id === issue.id ? 'bg-blue-600/10 border-l-4 border-blue-500' : 'hover:bg-slate-800/40'}`}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-blue-400 tracking-widest">{issue.id}</span>
                    <ExternalLink size={10} className="text-slate-600 group-hover:text-slate-400" />
                  </div>
                  <span className={`text-[9px] font-black px-2 py-0.5 rounded-full border ${
                    issue.priority === 'Critical' ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'
                  }`}>
                    {issue.priority}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-100 line-clamp-2 leading-snug">{issue.title}</h3>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{issue.category}</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                    <span className="text-[10px] text-slate-400 font-bold">{issue.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
          {selectedIssue ? (
            <>
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-100">{selectedIssue.title}</h2>
                    <p className="text-xs text-slate-500 font-medium">Mapped to <span className="text-blue-400 font-bold">{selectedIssue.id}</span> • Assigned to <span className="text-slate-300">AutoTest-Agent</span></p>
                  </div>
                  <button 
                    onClick={generateScript}
                    disabled={isGenerating}
                    className="flex items-center gap-2 bg-gradient-to-br from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-6 py-2.5 rounded-2xl text-sm font-bold shadow-xl shadow-blue-900/40 transition-all disabled:opacity-50"
                  >
                    {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                    {isGenerating ? 'Synthesizing...' : 'AI Generate Script'}
                  </button>
                </div>
                
                <div className="space-y-4">
                   <h4 className="text-xs font-black text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2">
                      <FileText size={14}/> Technical Brief
                   </h4>
                   <p className="text-sm text-slate-300 leading-relaxed bg-slate-950/50 p-5 rounded-2xl border border-slate-800 shadow-inner">
                      {selectedIssue.desc}
                   </p>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 flex-1 flex flex-col overflow-hidden shadow-2xl relative">
                <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold flex items-center gap-2 text-slate-200">
                      <Code size={20} className="text-emerald-400" />
                      Automation Workbench
                   </h3>
                   {generatedScript && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full animate-fade-in">Ready to Execute</span>}
                </div>
                
                <div className="flex-1 bg-slate-950 p-6 rounded-2xl font-mono text-xs overflow-y-auto text-blue-200 border border-slate-800 shadow-inner">
                   {isGenerating ? (
                     <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-4">
                        <Zap size={48} className="animate-bounce text-blue-500/50" />
                        <div className="text-center">
                          <p className="font-bold uppercase tracking-widest text-[10px] mb-1">Synthesizing Logic...</p>
                          <p className="text-[9px] opacity-60">Analyzing issue context and mapping device APIs</p>
                        </div>
                     </div>
                   ) : generatedScript ? (
                     <div className="animate-fade-in whitespace-pre leading-relaxed">
                        {generatedScript}
                     </div>
                   ) : (
                     <div className="h-full flex flex-col items-center justify-center text-slate-700 opacity-40">
                        <Code size={48} className="mb-2" />
                        <p className="text-xs font-bold uppercase tracking-widest">Script will appear here</p>
                     </div>
                   )}
                </div>
                
                {generatedScript && (
                   <div className="mt-4 flex gap-3 animate-slide-up">
                      <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-sm transition-all shadow-lg shadow-emerald-900/20">
                        Push to Regression Suite
                      </button>
                      <button className="px-6 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 rounded-xl text-sm border border-slate-700 transition-all">
                        Edit in Studio
                      </button>
                   </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex-1 bg-slate-900/50 border-4 border-slate-800/50 border-dashed rounded-[3rem] flex flex-col items-center justify-center text-slate-600 group transition-all hover:bg-slate-900 hover:border-blue-900/20">
               <div className="p-8 bg-slate-800/30 rounded-full mb-6 group-hover:scale-110 transition-transform">
                  <ClipboardList size={80} className="opacity-20 group-hover:opacity-40 transition-opacity" />
               </div>
               <p className="text-xl font-bold text-slate-400 mb-2">Issue Selection Required</p>
               <p className="text-sm max-w-xs text-center leading-relaxed">Select a high-priority ticket from the left column to begin generating regression intelligence.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
