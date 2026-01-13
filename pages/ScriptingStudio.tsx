
import React, { useState, useRef } from 'react';
import { Play, Save, Download, Plus, FileCode, Folder, ChevronRight, Search, Terminal, Loader2, CheckCircle, XCircle } from 'lucide-react';

export default function ScriptingStudio() {
  const [code, setCode] = useState(`import uiautomator2 as u2\nimport time\n\n# Connect to Android device via ADB\nd = u2.connect()\n\ndef test_camera_workflow():\n    print("[STEP 1] Starting camera app...")\n    d.app_start("com.android.camera")\n    \n    print("[STEP 2] Waiting for shutter button...")\n    time.sleep(2)\n    \n    print("[STEP 3] Triggering capture...")\n    d(text="Shutter").click()\n    \n    print("[SUCCESS] Image saved successfully")\n\nif __name__ == "__main__":\n    test_camera_workflow()`);

  const [isRunning, setIsRunning] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState('editor');
  const terminalRef = useRef<HTMLDivElement>(null);

  const runScript = async () => {
    setIsRunning(true);
    setTerminalOutput(["[SYSTEM] Initializing Python 3.10 environment...", "[SYSTEM] Loading dependencies: uiautomator2, time"]);
    
    const logs = [
      "[INFO] Connecting to device: adb-4492a (Xiaomi 13 Ultra)",
      "[DEBUG] Device status: AUTHORIZED",
      "[STEP 1] Starting camera app...",
      "[INFO] Intent sent: android.intent.action.MAIN",
      "[STEP 2] Waiting for shutter button...",
      "[DEBUG] Scanning UI hierarchy for text='Shutter'...",
      "[STEP 3] Triggering capture...",
      "[INFO] Input tap at coordinates (540, 1820)",
      "[SUCCESS] Image saved successfully",
      ">>> Process finished with exit code 0"
    ];

    for (const log of logs) {
      await new Promise(resolve => setTimeout(resolve, 600 + Math.random() * 400));
      setTerminalOutput(prev => [...prev, log]);
      if (terminalRef.current) {
        terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      }
    }
    setIsRunning(false);
  };

  return (
    <div className="h-[calc(100vh-160px)] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold text-slate-100">Script Studio</h1>
          <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800 shadow-inner">
            <button 
              onClick={() => setActiveTab('editor')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'editor' ? 'bg-slate-800 text-blue-400 shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
            >
              Python Editor
            </button>
            <button 
              onClick={() => setActiveTab('apis')}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === 'apis' ? 'bg-slate-800 text-blue-400 shadow-md' : 'text-slate-500 hover:text-slate-300'}`}
            >
              API Library
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={runScript}
            disabled={isRunning}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-800 disabled:text-slate-500 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-900/20 transition-all"
          >
            {isRunning ? <Loader2 size={18} className="animate-spin" /> : <Play size={18} />}
            {isRunning ? 'Executing...' : 'Run Script'}
          </button>
          <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-5 py-2 rounded-xl text-sm font-bold border border-slate-700 transition-all">
            <Save size={18} />
            Save
          </button>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-4 min-h-0">
        {/* File Explorer */}
        <div className="col-span-3 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col min-h-0 shadow-xl">
          <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-800/30">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Project Workspace</span>
            <Plus size={16} className="text-slate-400 cursor-pointer hover:text-white" />
          </div>
          <div className="flex-1 overflow-y-auto p-2">
            <div className="space-y-1">
              <div className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                <Folder size={16} className="text-blue-400" />
                <span className="text-sm font-medium">regression_tests/</span>
              </div>
              <div className="ml-4 space-y-1">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-400 rounded-lg cursor-pointer border border-blue-500/20">
                  <FileCode size={16} />
                  <span className="text-sm font-medium">camera_workflow.py</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                  <FileCode size={16} />
                  <span className="text-sm font-medium">login_loop_v2.py</span>
                </div>
              </div>
              <div className="flex items-center gap-2 px-3 py-2 text-slate-300 hover:bg-slate-800 rounded-lg cursor-pointer transition-colors">
                <Folder size={16} className="text-yellow-400" />
                <span className="text-sm font-medium">custom_lib/</span>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-slate-800 bg-slate-950/50">
             <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input placeholder="Search files..." className="w-full bg-slate-800 text-xs rounded-lg py-2 pl-10 border-none focus:ring-1 focus:ring-blue-500 transition-all" />
             </div>
          </div>
        </div>

        {/* Editor & Console */}
        <div className="col-span-9 flex flex-col gap-4 min-h-0">
           {/* Editor */}
           <div className="flex-[2] bg-slate-900 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-inner relative group">
             <div className="bg-slate-800/50 px-4 py-2 flex items-center justify-between border-b border-slate-800">
               <div className="flex items-center gap-2">
                 <FileCode size={14} className="text-blue-400" />
                 <span className="text-xs font-mono text-slate-300">camera_workflow.py</span>
               </div>
               <span className="text-[10px] text-slate-600 font-bold uppercase tracking-tighter">Python 3.10 • UTF-8</span>
             </div>
             <textarea 
               value={code}
               onChange={(e) => setCode(e.target.value)}
               className="flex-1 w-full bg-slate-900 p-6 font-mono text-sm resize-none focus:outline-none text-blue-100 placeholder:text-slate-800 leading-relaxed"
               spellCheck={false}
             />
             {isRunning && (
               <div className="absolute inset-0 bg-slate-950/20 backdrop-blur-[1px] pointer-events-none flex items-start justify-end p-8">
                  <div className="bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 text-xs font-bold text-blue-400 animate-pulse shadow-2xl">
                     <Play size={14} fill="currentColor" /> SCRIPT RUNNING
                  </div>
               </div>
             )}
           </div>

           {/* Terminal Output */}
           <div className="flex-1 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col overflow-hidden shadow-xl">
             <div className="p-3 border-b border-slate-800 flex items-center justify-between bg-slate-900/50">
               <div className="flex items-center gap-2">
                 <Terminal size={14} className="text-emerald-400" />
                 <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live Execution Log</span>
               </div>
               <button 
                 onClick={() => setTerminalOutput([])}
                 className="text-[10px] text-slate-600 hover:text-slate-300 font-bold uppercase"
               >
                 Clear Console
               </button>
             </div>
             <div 
               ref={terminalRef}
               className="flex-1 p-4 font-mono text-xs overflow-y-auto space-y-1.5 text-slate-300 bg-slate-950 selection:bg-emerald-500/30"
             >
               {terminalOutput.length === 0 ? (
                 <p className="text-slate-700 italic opacity-50">System ready. Click "Run Script" to start testing.</p>
               ) : (
                 terminalOutput.map((line, i) => (
                   <p key={i} className={`
                     ${line.includes('[SUCCESS]') ? 'text-emerald-400 font-bold' : ''}
                     ${line.includes('[STEP') ? 'text-blue-400 font-medium' : ''}
                     ${line.includes('[ERROR]') ? 'text-red-400' : ''}
                     ${line.includes('>>>') ? 'text-emerald-400 border-t border-slate-900 pt-2 mt-2' : ''}
                     ${line.includes('[SYSTEM]') ? 'text-purple-400 opacity-80' : ''}
                   `}>
                     {line}
                   </p>
                 ))
               )}
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
