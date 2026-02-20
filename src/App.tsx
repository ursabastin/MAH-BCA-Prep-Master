import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import QuizEngine from './components/QuizEngine';
import ImportWidget from './components/ImportWidget';
import Analytics from './components/Analytics';
import { LayoutGrid, PlayCircle, BarChart2, Layers, Disc, LucideIcon } from 'lucide-react';

function App() {
    const [view, setView] = useState('dashboard');
    const [stats, setStats] = useState({ accuracy: 0 });

    // Load stats logic (Same as before)
    useEffect(() => {
        const loadStats = async () => {
            try {
                const logs = await window.api.getLogs();
                if (logs && logs.length > 0) {
                    const correct = logs.filter((l: any) => l.isCorrect).length;
                    setStats({ accuracy: Math.round((correct / logs.length) * 100) });
                }
            } catch (err) {
                console.warn("Could not load stats", err);
            }
        };
        loadStats();
    }, [view]);

    return (
        // Flex-row-reverse puts the sidebar on the RIGHT
        <div className="flex flex-row-reverse h-screen bg-[#F5F5F7] text-[#1d1d1f] font-sans selection:bg-black/10">

            {/* RIGHT Sidebar - Premium Glass Look */}
            <aside className="w-24 lg:w-72 glass-card z-50 flex flex-col items-center py-10 h-full rounded-l-3xl border-l border-white/50">

                {/* Brand Logo - Minimalist */}
                <div className="mb-16 flex flex-col items-center gap-3">
                    <div className="w-12 h-12 bg-black text-white rounded-2xl flex items-center justify-center shadow-xl shadow-black/20">
                        <Disc size={28} strokeWidth={2.5} />
                    </div>
                    <span className="hidden lg:block font-bold text-lg tracking-tight text-black">
                        BCA<span className="text-gray-400">OS</span>
                    </span>
                </div>

                {/* Navigation - Right Aligned Aesthetics */}
                <nav className="flex-1 w-full px-6 space-y-4">
                    <NavButton active={view === 'dashboard'} onClick={() => setView('dashboard')} icon={LayoutGrid} label="Overview" />
                    <NavButton active={view === 'quiz'} onClick={() => setView('quiz')} icon={PlayCircle} label="Simulator" />
                    <NavButton active={view === 'analytics'} onClick={() => setView('analytics')} icon={BarChart2} label="Analytics" />
                    <NavButton active={view === 'import'} onClick={() => setView('import')} icon={Layers} label="Data Bank" />
                </nav>

                <div className="mt-auto mb-6 text-xs text-gray-400 font-medium">v1.0.0 Pro</div>
            </aside>

            {/* Main Content - Takes Full Remaining Space */}
            <main className="flex-1 relative h-full overflow-hidden p-8 lg:p-12">
                {/* Ambient Glossy Background Blobs */}
                <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-blue-200/20 rounded-full blur-[120px] pointer-events-none"></div>
                <div className="absolute bottom-[-10%] right-[20%] w-[600px] h-[600px] bg-purple-200/20 rounded-full blur-[100px] pointer-events-none"></div>

                <div className="relative z-10 h-full overflow-y-auto pr-4 scrollbar-hide">
                    {view === 'dashboard' && <Dashboard onStartQuiz={() => setView('quiz')} stats={stats} />}
                    {view === 'quiz' && <QuizEngine />}
                    {view === 'analytics' && <Analytics />}
                    {view === 'import' && <div className="max-w-3xl mx-auto"><ImportWidget /></div>}
                </div>
            </main>
        </div>
    );
}

interface NavButtonProps {
    active: boolean;
    onClick: () => void;
    icon: LucideIcon;
    label: string;
}

// Minimalist Premium Button
const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group ${active
                ? 'bg-black text-white shadow-2xl shadow-black/10 scale-105'
                : 'text-gray-500 hover:bg-white/60 hover:text-black'
            }`}
    >
        <Icon size={22} strokeWidth={active ? 2.5 : 2} />
        <span className="hidden lg:block font-medium tracking-wide">{label}</span>
    </button>
);

export default App;
