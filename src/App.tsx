import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import QuizEngine from './components/QuizEngine';
import ImportWidget from './components/ImportWidget';
import Analytics from './components/Analytics';
import { LayoutGrid, Disc } from 'lucide-react'; // Removed other icons

function App() {
    const [view, setView] = useState('dashboard');
    const [stats, setStats] = useState({ accuracy: 0 });
    const [selectedSubject, setSelectedSubject] = useState<string | null>(null);

    useEffect(() => {
        const loadStats = async () => {
            try {
                if (window.api) {
                    const logs = await window.api.getLogs();
                    if (logs && logs.length > 0) {
                        const correct = logs.filter((l: any) => l.isCorrect).length;
                        setStats({ accuracy: Math.round((correct / logs.length) * 100) });
                    }
                }
            } catch (err) {
                console.warn("Could not load stats", err);
            }
        };
        loadStats();
    }, [view]);

    return (
        <div className="flex flex-row-reverse h-screen bg-black text-white font-sans selection:bg-white/20">

            {/* SIDEBAR: Minimalist & Clean */}
            <aside className="w-20 lg:w-24 border-l border-white/10 flex flex-col items-center py-8 z-50 bg-black/50 backdrop-blur-xl">

                {/* Logo */}
                <div className="mb-12 p-3 rounded-xl bg-white/5 border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                    <Disc size={20} className="text-white" />
                </div>

                {/* Nav - Only Dashboard visible, others hidden but accessible via logic if needed */}
                <nav className="flex-1 w-full flex flex-col items-center gap-6">
                    <button
                        onClick={() => { setView('dashboard'); setSelectedSubject(null); }}
                        className={`p-3 rounded-xl transition-all duration-300 ${view === 'dashboard' ? 'bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]' : 'text-gray-500 hover:text-white'
                            }`}
                    >
                        <LayoutGrid size={20} />
                    </button>

                    {/* Hidden features are still here in code, just not rendered in UI */}
                </nav>

                <div className="mt-auto text-[10px] text-gray-600 font-mono rotate-90 whitespace-nowrap tracking-widest">
                    MAH-CET PRO
                </div>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 relative h-full overflow-hidden p-6 lg:p-10">

                {/* Subtle Background Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-white/5 rounded-full blur-[150px] pointer-events-none"></div>

                <div className="relative z-10 h-full">
                    {view === 'dashboard' && <Dashboard onStartQuiz={(sub?: string | null) => { setSelectedSubject(sub || null); setView('quiz'); }} stats={stats} />}
                    {view === 'quiz' && <QuizEngine subjectFilter={selectedSubject} />}
                    {view === 'analytics' && <Analytics />}
                    {view === 'import' && <div className="max-w-3xl mx-auto"><ImportWidget /></div>}
                </div>
            </main>
        </div>
    );
}

export default App;
