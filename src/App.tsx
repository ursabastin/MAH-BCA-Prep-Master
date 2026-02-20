import { useState } from 'react';
import QuizEngine from './components/QuizEngine';
import ImportWidget from './components/ImportWidget';
import { Database, Play } from 'lucide-react';

function App() {
    const [view, setView] = useState('quiz'); // 'quiz' or 'import'
    const [refreshKey, setRefreshKey] = useState(0); // Trick to force reload quiz engine

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans selection:bg-blue-500/30">

            {/* Top Navigation Bar */}
            <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                        MAH-BCA Prep Master
                    </h1>

                    <div className="flex gap-2">
                        <button
                            onClick={() => setView('quiz')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${view === 'quiz' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
                                }`}
                        >
                            <Play size={18} /> Practice
                        </button>
                        <button
                            onClick={() => setView('import')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${view === 'import' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800'
                                }`}
                        >
                            <Database size={18} /> Import Data
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto p-6">
                {view === 'import' ? (
                    <div className="max-w-2xl mx-auto mt-10">
                        <ImportWidget onImportSuccess={() => setRefreshKey(k => k + 1)} />

                        {/* Instruction Card for User */}
                        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
                            <h4 className="font-semibold text-slate-300 mb-3">How to generate questions:</h4>
                            <p className="text-sm text-slate-400 mb-2">Paste this prompt into NotebookLM:</p>
                            <code className="block bg-black/50 p-4 rounded text-xs font-mono text-emerald-400 select-all whitespace-pre-wrap">
                                {`Create a JSON array of 10 multiple choice questions based on the source.
Use this exact format:
[
  {
    "question": "Question text here?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": "Option B",
    "subject": "Computer Basics" 
  }
]
Valid subjects: English Language, Reasoning, General Knowledge, Computer Basics.`}
                            </code>
                        </div>
                    </div>
                ) : (
                    <QuizEngine key={refreshKey} />
                )}
            </main>
        </div>
    );
}

export default App;
