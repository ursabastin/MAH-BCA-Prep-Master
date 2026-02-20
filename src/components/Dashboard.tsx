import React from 'react';
import MouseTracker from './MouseTracker';
import OrbitRing from './OrbitRing';
import HoloCore from './HoloCore';

interface DashboardProps {
    onStartQuiz: (subject?: string | null) => void;
    stats: { accuracy: number };
}

const Dashboard: React.FC<DashboardProps> = ({ onStartQuiz, stats }) => {
    return (
        <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden bg-black animate-fade-in">
            {/* 1. The Wind glow effect (Reacts to cursor) */}
            <MouseTracker />

            <div className="relative w-[600px] h-[600px] flex items-center justify-center">
                {/* 2. The Planetary Subject Options */}
                <OrbitRing onStartQuiz={(subject: string) => onStartQuiz(subject)} />

                {/* 3. The Central Mock Button */}
                <HoloCore onStartMock={() => onStartQuiz(null)} accuracy={stats.accuracy} />
            </div>

            {/* Minimal Branding */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[10px] text-gray-500 font-mono tracking-[0.2em] uppercase z-10 pointer-events-none">
                Immersive Portal Online • Frame 2026
            </div>
        </div>
    );
};

export default Dashboard;
