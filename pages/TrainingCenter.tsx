
import React from 'react';
import { BookOpen, PlayCircle, Trophy, FileText, CheckCircle2, ChevronRight } from 'lucide-react';

const CourseCard = ({ title, level, lessons, icon: Icon }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500/50 transition-all cursor-pointer group shadow-lg">
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-400 group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
        level === 'Beginner' ? 'bg-green-600/10 text-green-400' : 'bg-orange-600/10 text-orange-400'
      }`}>
        {level}
      </span>
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-sm text-slate-500 mb-6">{lessons} Lessons • Interactive Lab</p>
    <button className="w-full flex items-center justify-between text-sm font-bold text-blue-400 group-hover:text-white transition-colors">
       Start Learning
       <ChevronRight size={18} />
    </button>
  </div>
);

export default function TrainingCenter() {
  return (
    <div className="max-w-6xl mx-auto space-y-12">
      <header className="text-center space-y-4 py-8">
        <h1 className="text-4xl font-bold">OmniTest Academy</h1>
        <p className="text-slate-400 text-lg">From zero to automation pro. Master intelligent testing systems.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CourseCard title="Introduction to Scrapy & Mirroring" level="Beginner" lessons={5} icon={PlayCircle} />
        <CourseCard title="Advanced CAN Bus Debugging" level="Intermediate" lessons={8} icon={BookOpen} />
        <CourseCard title="AI Agent Orchestration" level="Expert" lessons={12} icon={Trophy} />
        <CourseCard title="Python for QA Engineers" level="Beginner" lessons={10} icon={FileText} />
        <CourseCard title="Computer Vision & Verdicts" level="Intermediate" lessons={6} icon={CheckCircle2} />
      </div>

      <div className="bg-blue-600 rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-900/40">
        <div className="space-y-2 text-center md:text-left">
          <h2 className="text-2xl font-bold text-white">Need a custom training session?</h2>
          <p className="text-blue-100">Schedule a 1-on-1 with our system architects to build your perfect test lab.</p>
        </div>
        <button className="whitespace-nowrap bg-white text-blue-600 font-bold px-8 py-3 rounded-2xl hover:bg-blue-50 transition-colors">
          Contact Expert
        </button>
      </div>
    </div>
  );
}
