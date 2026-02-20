import React from 'react';
import { ArrowRight, Zap, Target } from 'lucide-react';

interface DashboardProps {
    onStartQuiz: (subject?: string | null) => void;
    stats: { accuracy: number };
}

const Dashboard: React.FC<DashboardProps> = ({ onStartQuiz, stats }) => {
    return (
        <div className="h-full flex flex-col justify-center max-w-4xl mx-auto animate-fade-in">

            {/* Header Section - Smaller Text */}
            <div className="mb-8 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
                        MAH-BCA CET <span className="px-2 py-0.5 rounded-md bg-white/10 text-xs font-mono text-gray-300">2026</span>
                    </h2>
                    <p className="text-sm text-gray-400 mt-1 font-light">
                        System Ready. No negative marking active.
                    </p>
                </div>

                {/* Quick Stat Pill */}
                <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5">
                    <Target size={14} className="text-gray-400" />
                    <span className="text-sm font-mono text-white">{stats.accuracy || 0}% Accuracy</span>
                </div>
            </div>

            {/* THE MAIN CARD - The only focus */}
            <div
                onClick={() => onStartQuiz(null)}
                className="neon-glass group relative overflow-hidden rounded-2xl p-8 cursor-pointer h-64 flex flex-col justify-between"
            >
                {/* Content */}
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-xs font-bold text-gray-400 mb-2 uppercase tracking-wider">
                        <Zap size={12} className="text-white" />
                        Full Simulation
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2 group-hover:text-gray-200 transition-colors">
                        Start Mock Exam
                    </h1>
                    <p className="text-sm text-gray-500 max-w-md group-hover:text-gray-400 transition-colors">
                        100 Questions • 120 Minutes • Adaptive Engine
                    </p>
                </div>

                {/* Action Indicator */}
                <div className="relative z-10 flex items-center gap-2 text-sm font-medium text-white group-hover:translate-x-2 transition-transform">
                    Begin Session <ArrowRight size={16} />
                </div>

                {/* Decorative Glows */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-gradient-to-br from-white/10 to-transparent rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            </div>

            {/* Footer Note */}
            <div className="mt-8 text-center text-[10px] text-gray-600 font-mono">
                PRESS 'ENTER' TO START • ESC TO EXIT
            </div>

        </div>
    );
};

export default Dashboard;
