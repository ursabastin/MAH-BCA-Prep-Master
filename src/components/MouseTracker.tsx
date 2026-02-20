import React from 'react';
import { motion } from 'framer-motion';
import { useMousePosition } from '../hooks/useMousePosition';

const MouseTracker: React.FC = () => {
    const { dx, dy } = useMousePosition();

    return (
        <motion.div
            className="absolute w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 pointer-events-none z-0"
            animate={{
                background: `radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(0,0,0,0) 70%)`,
                x: dx * 0.2,
                y: dy * 0.2
            }}
            transition={{ type: 'spring', damping: 30, stiffness: 50 }}
            style={{ left: '50%', top: '50%', marginLeft: '-400px', marginTop: '-400px' }}
        />
    );
};

export default MouseTracker;
