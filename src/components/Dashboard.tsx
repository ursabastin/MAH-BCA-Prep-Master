import React from 'react';
import { BookOpen, Cpu, Globe, BrainCircuit, PlayCircle, Trophy } from 'lucide-react';

interface DashboardProps {
    onStartQuiz: () => void;
    stats: { accuracy: number };
}

const Dashboard: React.FC<DashboardProps> = ({ onStartQuiz, stats }) => {
    // Data derived from MAH-BCA CET 2026 Exam Pattern
    const sections = [
        { id: 'english', name: 'English Language', total: 30, icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { id: 'reasoning', name: 'Reasoning (Verbal & Arithmetic)', total: 30, icon: BrainCircuit, color: 'text-purple-400', bg: 'bg-purple-400/10' },
        { id: 'gk', name: 'General Knowledge', total: 20, icon: Globe, color: 'text-amber-400', bg: 'bg-amber-400/10' },
        { id: 'computer', name: 'Computer Basics', total: 20, icon: Cpu, color: 'text-emerald-400', bg: 'bg-emerald-400/10' }
    ];

    return (
        <div className="p-8 max-w-6xl mx-auto animate-fade-in text-slate-200">
            {/* Header */}
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                        MAH-BCA CET 2026 Dashboard
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Target: 100 Marks | Duration: 120 Mins | No Negative Marking
                    </p>
                </div>
                <button
                    onClick={onStartQuiz}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-900/20 transition-all hover:scale-105"
                >
                    <PlayCircle size={24} /> Start Full Mock
                </button>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="flex items-center gap-3 mb-2 text-slate-400">
                        <Trophy size={20} />
                        <span className="text-sm font-medium">Average Accuracy</span>
                    </div>
                    <p className="text-4xl font-bold text-white">{stats.accuracy || 0}%</p>
                </div>

                {/* Exam Pattern Info Card */}
                <div className="bg-slate-800/60 border border-slate-700 p-6 rounded-2xl backdrop-blur-sm col-span-2">
                    <h3 className="text-lg font-semibold text-white mb-3">Exam Strategy Insight</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">
                        To secure a 99th percentile (approx. 115-120 marks), you need high accuracy in
                        <strong> Reasoning</strong> and <strong>Computer Basics</strong>.
                        Target solving questions in ~72 seconds each.
                    </p>
                </div>
            </div>

            {/* Sectional Breakdown */}
            <h2 className="text-xl font-semibold mb-6 text-white">Subject Proficiency</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sections.map((sec) => (
                    <div key={sec.id} className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl hover:border-slate-600 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-lg ${sec.bg} ${sec.color}`}>
                                <sec.icon size={24} />
                            </div>
                            <span className="text-xs font-mono bg-slate-800 px-2 py-1 rounded text-slate-400">
                                Weightage: {sec.total} Marks
                            </span>
                        </div>
                        <h3 className="text-lg font-medium text-slate-200">{sec.name}</h3>
                        <div className="mt-4 h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full ${sec.color.replace('text', 'bg')} opacity-80`}
                                style={{ width: `${Math.random() * 100}%` }} // Placeholder for real stats
                            ></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
