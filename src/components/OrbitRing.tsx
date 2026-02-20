import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, BrainCircuit, Globe, Cpu } from 'lucide-react';

interface OrbitRingProps {
    onStartQuiz: (subject: string) => void;
}

const OrbitRing: React.FC<OrbitRingProps> = ({ onStartQuiz }) => {
    const sections = [
        { id: 'english', name: 'English Language', total: 30, icon: BookOpen, color: '#60A5FA', angle: -45 },
        { id: 'reasoning', name: 'Reasoning', total: 40, icon: BrainCircuit, color: '#C084FC', angle: 45 },
        { id: 'gk', name: 'General Knowledge', total: 15, icon: Globe, color: '#FBBF24', angle: 135 },
        { id: 'computer', name: 'Computer Basics', total: 15, icon: Cpu, color: '#34D399', angle: -135 }
    ];

    return (
        <div className="absolute w-[600px] h-[600px] left-1/2 top-1/2 -ml-[300px] -mt-[300px] z-10 pointer-events-none">
            {/* Minimal visible nests (rotating dashed rings) */}
            <motion.div
                className="absolute inset-0 rounded-full border border-white/5 border-dashed"
                animate={{ rotate: 360 }}
                transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="absolute inset-[75px] rounded-full border border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
            />

            {/* Feature Ring (Planetary Icons) */}
            {sections.map((sec) => {
                const rad = sec.angle * (Math.PI / 180);
                const r = 300; // Orbit radius
                const cx = 300; // Center div radius
                const cy = 300;

                const x = cx + r * Math.cos(rad);
                const y = cy + r * Math.sin(rad);

                return (
                    <motion.div
                        key={sec.id}
                        className="absolute pointer-events-auto flex flex-col items-center justify-center gap-2 group focus:outline-none cursor-pointer"
                        style={{
                            left: x - 40,
                            top: y - 40,
                            width: 80,
                            height: 80
                        }}
                        onClick={() => onStartQuiz(sec.name)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <div className="w-20 h-20 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)] group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                            <sec.icon size={28} color={sec.color} className="opacity-80 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        <div className="absolute top-[90px] bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap z-50">
                            <span className="text-white text-xs font-bold">{sec.name}</span>
                            <span className="text-gray-400 text-[10px] ml-2">{sec.total} Qs</span>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default OrbitRing;
