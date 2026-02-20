import { useState, useEffect } from 'react';

export const useMousePosition = () => {
    const [mouseInfo, setMouseInfo] = useState({ x: 0, y: 0, cx: 0, cy: 0, dx: 0, dy: 0, angle: 0, distance: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const cx = window.innerWidth / 2;
            const cy = window.innerHeight / 2;
            const dx = e.clientX - cx;
            const dy = e.clientY - cy;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx) * (180 / Math.PI);

            setMouseInfo({
                x: e.clientX,
                y: e.clientY,
                cx, cy, dx, dy, angle, distance
            });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    return mouseInfo;
};
