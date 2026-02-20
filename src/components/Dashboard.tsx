import React from 'react';
import { Book, Cpu, Globe, BrainCircuit, ArrowRight, Zap } from 'lucide-react';

interface DashboardProps {
    onStartQuiz: () => void;
    stats: { accuracy: number };
}

const Dashboard: React.FC<DashboardProps> = ({ onStartQuiz, stats }) => {
    const sections = [
        { id: 'english', name: 'English', sub: 'Language & Comp.', total: 30, icon: Book, color: 'text-blue-600', bg: 'bg-blue-50' },
        { id: 'reasoning', name: 'Reasoning', sub: 'Verbal & Arithmetic', total: 30, icon: BrainCircuit, color: 'text-purple-600', bg: 'bg-purple-50' },
        { id: 'gk', name: 'General Knowledge', sub: 'Awareness', total: 20, icon: Globe, color: 'text-orange-600', bg: 'bg-orange-50' },
        { id: 'computer', name: 'Computer Basics', sub: 'IT Fundamentals', total: 20, icon: Cpu, color: 'text-emerald-600', bg: 'bg-emerald-50' }
    ];

    return (
        <div className="h-full flex flex-col justify-between animate-fade-in">

            {/* Header Section */}
            <div className="flex justify-between items-end mb-10">
                <div>
                    <h2 className="text-4xl font-extrabold text-black tracking-tight mb-2">Hello, Student</h2>
                    <p className="text-xl text-gray-500 font-light">Ready to master the MAH-BCA CET 2026?</p>
                </div>

                <div className="text-right">
                    <div className="text-5xl font-black text-black">{stats.accuracy || 0}%</div>
                    <div className="text-sm font-semibold text-gray-400 uppercase tracking-widest mt-1">Current Accuracy</div>
                </div>
            </div>

            {/* Main Action Card - Dominates the Screen */}
            <div className="glass-card rounded-3xl p-10 mb-10 flex justify-between items-center relative overflow-hidden group cursor-pointer hover:shadow-2xl hover:scale-[1.01] transition-all duration-500"
                onClick={onStartQuiz}>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-sm font-bold text-black mb-4">
                        <Zap size={16} fill="black" /> 120 Mins Exam Mode
                    </div>
                    <h1 className="text-5xl font-bold text-black mb-4 leading-tight">Start Full Mock <br />Simulation</h1>
                    <p className="text-lg text-gray-500 max-w-lg">
                        Attempt 100 questions across all 4 sections. No negative marking.
                        Adaptive difficulty engine enabled.
                    </p>
                </div>

                {/* Floating Play Button */}
                <div className="h-24 w-24 bg-black rounded-full flex items-center justify-center text-white shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <ArrowRight size={40} />
                </div>

                {/* Background decoration */}
                <div className="absolute right-[-50px] bottom-[-50px] w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full z-0 opacity-50"></div>
            </div>

            {/* Subject Grid - Fits nicely at bottom */}
            <div className="grid grid-cols-4 gap-6">
                {sections.map((sec) => (
                    <div key={sec.id} className="glass-card p-6 rounded-2xl hover:shadow-xl transition-all duration-300">
                        <div className={`w-12 h-12 ${sec.bg} ${sec.color} rounded-xl flex items-center justify-center mb-4`}>
                            <sec.icon size={24} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-lg font-bold text-black">{sec.name}</h3>
                        <p className="text-xs text-gray-400 font-medium mb-4">{sec.sub}</p>
                        <div className="flex items-center justify-between text-sm font-semibold text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                            <span>Weightage</span>
                            <span className="text-black">{sec.total} Marks</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Dashboard;
