import React from 'react';
import { Section } from '../types';

interface UnlockPopupProps {
    unlockedSection: Section;
}

const UnlockPopup: React.FC<UnlockPopupProps> = ({ unlockedSection }) => {
    return (
        <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center z-50 pointer-events-auto">
            <div className="bg-slate-800/80 border-2 border-cyan-400 p-8 rounded-2xl shadow-2xl shadow-cyan-500/40 text-center animate-popup-enter max-w-sm w-full mx-4">
                <p className="text-sm font-bold text-cyan-400 tracking-widest uppercase">Section Unlocked</p>
                <h2 className="text-4xl font-extrabold text-white my-2">{unlockedSection}</h2>
                <p className="text-slate-300">Feel free to explore!</p>
            </div>
        </div>
    );
};

export default UnlockPopup;
