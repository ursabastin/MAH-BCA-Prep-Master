import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import QuizEngine from './components/QuizEngine';
import ImportWidget from './components/ImportWidget';
import Analytics from './components/Analytics';
import { LayoutDashboard, Play, PieChart, Database, LucideIcon } from 'lucide-react';

function App() {
    const [view, setView] = useState('dashboard'); // Default to Dashboard
    const [stats, setStats] = useState({ accuracy: 0 });

    // Load stats from backend on mount
    useEffect(() => {
        const loadStats = async () => {
            try {
                const logs = await window.api.getLogs();
                if (logs && logs.length > 0) {
                    const correct = logs.filter((l: any) => l.isCorrect).length;
                    setStats({
                        accuracy: Math.round((correct / logs.length) * 100)
                    });
                }
            } catch (error) {
                console.warn("Could not load logs yet.");
            }
        };
        loadStats();
    }, [view]); // Refresh stats when view changes

    return (
        <div className="flex min-h-screen bg-[#0f172a] text-slate-200 font-sans">

            {/* Sidebar Navigation - The "System" Feel */}
            <aside className="w-20 lg:w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-md flex flex-col fixed h-full z-20 transition-all">
                <div className="h-16 flex items-center justify-center border-b border-slate-800">
                    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold text-white">
                        M
                    </div>
                    <span className="ml-3 font-bold text-lg hidden lg:block text-white">PrepMaster</span>
                </div>

                <nav className="flex-1 py-6 space-y-2 px-3">
                    <NavButton
                        active={view === 'dashboard'}
                        onClick={() => setView('dashboard')}
                        icon={LayoutDashboard}
                        label="Dashboard"
                    />
                    <NavButton
                        active={view === 'quiz'}
                        onClick={() => setView('quiz')}
                        icon={Play}
                        label="Practice"
                    />
                    <NavButton
                        active={view === 'analytics'}
                        onClick={() => setView('analytics')}
                        icon={PieChart}
                        label="Analytics"
                    />
                    <NavButton
                        active={view === 'import'}
                        onClick={() => setView('import')}
                        icon={Database}
                        label="Data Bank"
                    />
                </nav>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-20 lg:ml-64 relative z-10 overflow-y-auto h-screen">
                {/* Background Gradients */}
                <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
                    <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                    <div className="absolute bottom-[-20%] left-[10%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]"></div>
                </div>

                {view === 'dashboard' && <Dashboard onStartQuiz={() => setView('quiz')} stats={stats} />}
                {view === 'quiz' && <QuizEngine />}
                {view === 'analytics' && <Analytics />}
                {view === 'import' && <div className="p-8"><ImportWidget /></div>}
            </main>
        </div>
    );
}

// Reusable Nav Component
interface NavButtonProps {
    active: boolean;
    onClick: () => void;
    icon: LucideIcon;
    label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon: Icon, label }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${active
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
    >
        <Icon size={22} className={active ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'} />
        <span className="hidden lg:block font-medium">{label}</span>
    </button>
);

export default App;
