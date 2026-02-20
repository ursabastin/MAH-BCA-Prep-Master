import React from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useMousePosition } from '../hooks/useMousePosition';

interface HoloCoreProps {
    onStartMock: () => void;
    accuracy: number;
}

const HoloCore: React.FC<HoloCoreProps> = ({ onStartMock, accuracy }) => {
    const { dx, dy } = useMousePosition();

    // Wind Switch: Create light refraction opposite to mouse
    const shadowX = -dx * 0.05;
    const shadowY = -dy * 0.05;

    return (
        <motion.button
            onClick={onStartMock}
            className="absolute left-1/2 top-1/2 -ml-40 -mt-40 z-20 w-80 h-80 rounded-full flex flex-col items-center justify-center cursor-pointer group focus:outline-none"
            animate={{
                boxShadow: `inset ${shadowX}px ${shadowY}px 50px rgba(255,255,255,0.05), 0 20px 50px rgba(0,0,0,0.8)`
            }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {/* Core Glass Background */}
            <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-2xl border border-white/20 group-hover:border-white/40 transition-colors duration-500"></div>

            {/* Inner Glowing Ring */}
            <div className="absolute inset-4 rounded-full border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]"></div>

            <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(255,255,255,0.3)] group-hover:shadow-[0_0_50px_rgba(255,255,255,0.5)] transition-shadow duration-300">
                    <Play size={32} fill="currentColor" className="ml-2" />
                </div>
                <div className="text-xs tracking-[0.3em] text-gray-400 font-mono mb-2 uppercase">System Ready</div>
                <div className="text-3xl font-black text-white tracking-tight">ENGAGE</div>
                <div className="text-sm font-medium text-gray-500 mt-2">100 Questions • 120 Mins</div>

                {/* Accuracy Stat */}
                <div className="mt-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-white/80">
                    Acc: {accuracy || 0}%
                </div>
            </div>
        </motion.button>
    );
};

export default HoloCore;
