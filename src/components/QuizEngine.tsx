import { useState, useEffect } from 'react';
import { ChevronRight, CheckCircle, XCircle, Timer } from 'lucide-react';
import { useGameControls } from '../hooks/useGameControls';
import { playCorrect, playWrong, playClick } from '../utils/sound';

const QuizEngine = () => {
    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [loading, setLoading] = useState(true);

    // Exam constraints: 90 Minutes = 5400 seconds
    const [timeLeft, setTimeLeft] = useState(5400);

    // 1. Load Data
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await window.api.loadQuestions();
                if (data && data.length > 0) {
                    setQuestions(data);
                } else {
                    setQuestions([{
                        id: 1,
                        question: "Which component of the CPU performs arithmetic operations?",
                        options: ["CU", "ALU", "Memory", "Register"],
                        answer: "ALU",
                        subject: "Computer Basics"
                    }]);
                }
            } catch (error) {
                console.error("Failed to load questions", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuestions();
    }, []);

    // 2. Timer Logic
    useEffect(() => {
        if (loading || timeLeft <= 0) return;
        const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        return () => clearInterval(timer);
    }, [loading, timeLeft]);

    // Format Time
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s < 10 ? '0' : ''}${s}`;
    };

    // 3. Game Logic
    const handleOptionClick = (option: string) => {
        if (showResult) return;
        playClick();
        setSelectedOption(option);
    };

    const handleNext = async () => {
        if (!selectedOption && !showResult) return; // Prevent skipping without selection

        const currentQ = questions[currentIndex];

        if (!showResult) {
            // Reveal Phase
            const isCorrect = selectedOption === currentQ.answer;
            if (isCorrect) {
                setScore(s => s + 1);
                playCorrect();
            } else {
                playWrong();
            }
            setShowResult(true);

            // Log Data
            const logEntry = {
                questionId: currentQ.id || Date.now(),
                selected: selectedOption,
                correct: currentQ.answer,
                isCorrect: isCorrect,
                subject: currentQ.subject || "General",
                timestamp: new Date().toISOString()
            };
            await window.api.saveAttempt(logEntry);

        } else {
            // Transition Phase
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(c => c + 1);
                setSelectedOption(null);
                setShowResult(false);
            } else {
                alert(`Exam Finished! Score: ${score}/${questions.length}`);
                setCurrentIndex(0);
                setScore(0);
                setSelectedOption(null);
                setShowResult(false);
                setTimeLeft(5400); // Reset Timer
            }
        }
    };

    // 4. Keyboard Hook
    useGameControls(
        (index: number) => {
            if (questions[currentIndex] && questions[currentIndex].options[index]) {
                handleOptionClick(questions[currentIndex].options[index]);
            }
        },
        handleNext
    );

    if (loading) return <div className="text-white p-10">Loading Engine...</div>;

    const currentQ = questions[currentIndex];

    return (
        <div className="flex flex-col h-[calc(100vh-100px)] max-w-5xl mx-auto">

            {/* HUD Panel */}
            <div className="flex justify-between items-center mb-6 p-4 bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700 shadow-lg">
                <div className="flex items-center gap-4">
                    <div className="px-3 py-1 bg-slate-700 rounded text-sm font-mono text-blue-300">
                        Q{currentIndex + 1}/{questions.length}
                    </div>
                    <span className="text-xs text-slate-400 uppercase tracking-widest font-bold">
                        {currentQ?.subject}
                    </span>
                </div>

                {/* Timer Display */}
                <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-emerald-400'}`}>
                    <Timer size={20} />
                    <span>{formatTime(timeLeft)}</span>
                </div>
            </div>

            {/* Main Question Area */}
            <div className="flex-1 flex flex-col justify-center">
                <h2 className="text-3xl font-bold mb-10 text-white leading-tight">
                    {currentQ?.question}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentQ?.options?.map((option: string, idx: number) => {
                        let statusClass = "border-slate-700 bg-slate-800/40 hover:bg-slate-700/50"; // Default

                        if (showResult) {
                            if (option === currentQ.answer) statusClass = "border-emerald-500 bg-emerald-500/20 text-emerald-200";
                            else if (option === selectedOption) statusClass = "border-red-500 bg-red-500/20 text-red-200";
                            else statusClass = "border-slate-700 opacity-50";
                        } else if (selectedOption === option) {
                            statusClass = "border-blue-500 bg-blue-600/30 text-white ring-2 ring-blue-500/50";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => handleOptionClick(option)}
                                className={`relative p-6 rounded-xl border-2 text-left transition-all duration-200 group ${statusClass}`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-900/50 text-slate-400 text-sm font-bold group-hover:bg-slate-900 group-hover:text-white transition-colors">
                                            {idx + 1}
                                        </span>
                                        <span className="text-lg font-medium">{option}</span>
                                    </div>
                                    {showResult && option === currentQ.answer && <CheckCircle className="text-emerald-400" />}
                                    {showResult && option === selectedOption && option !== currentQ.answer && <XCircle className="text-red-400" />}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Footer Controls */}
            <div className="mt-8 flex justify-between items-center border-t border-slate-800 pt-6">
                <div className="text-xs text-slate-500 flex gap-4">
                    <span>Press <kbd className="bg-slate-800 px-1 rounded text-slate-300">1-4</kbd> to select</span>
                    <span>Press <kbd className="bg-slate-800 px-1 rounded text-slate-300">Enter</kbd> for next</span>
                </div>

                <button
                    onClick={handleNext}
                    disabled={!selectedOption && !showResult}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white px-10 py-3 rounded-lg font-bold tracking-wide transition-all shadow-lg shadow-blue-900/20"
                >
                    {showResult ? (currentIndex === questions.length - 1 ? "Finish Exam" : "Next Question") : "Confirm Answer"}
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default QuizEngine;
