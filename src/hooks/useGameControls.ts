import { useEffect } from 'react';

export const useGameControls = (onOptionSelect: (index: number) => void, onNext: () => void) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            switch (e.key) {
                case '1': onOptionSelect(0); break;
                case '2': onOptionSelect(1); break;
                case '3': onOptionSelect(2); break;
                case '4': onOptionSelect(3); break;
                case 'Enter': onNext(); break;
                default: break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onOptionSelect, onNext]);
};
