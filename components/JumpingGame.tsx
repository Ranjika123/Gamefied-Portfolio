import React, { useState, useEffect, useRef } from 'react';
import { Section } from '../types';
import { HomeIcon, UserIcon, BriefcaseIcon, CodeBracketIcon, EnvelopeIcon, SECTION_COLORS } from '../constants';

interface Position {
  left: number;
  top: number;
}

interface JumpingGameProps {
    unlockedSections: Set<Section>;
    activeSection: Section;
    playerColor: { bg: string; shadow: string; };
    onSectionSelect: (section: Section) => void;
}

const SECTION_DETAILS: { [key in Section]: { icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode; pos: { x: number; y: number } } } = {
    [Section.Home]:     { icon: HomeIcon,        pos: { x: 0.5, y: 0.9 } },
    [Section.About]:    { icon: UserIcon,        pos: { x: 0.2, y: 0.65 } },
    [Section.Projects]: { icon: BriefcaseIcon,   pos: { x: 0.8, y: 0.65 } },
    [Section.Skills]:   { icon: CodeBracketIcon, pos: { x: 0.35, y: 0.30 } },
    [Section.Contact]:  { icon: EnvelopeIcon,    pos: { x: 0.65, y: 0.30 } },
};

const JumpingGame: React.FC<JumpingGameProps> = ({ unlockedSections, activeSection, playerColor, onSectionSelect }) => {
    const [platformPositions, setPlatformPositions] = useState<{ [key in Section]?: Position }>({});
    const [playerPosition, setPlayerPosition] = useState<Position | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const calculatePositions = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                const newPositions: { [key in Section]?: Position } = {};
                for (const key in SECTION_DETAILS) {
                    const section = key as Section;
                    const details = SECTION_DETAILS[section];
                    newPositions[section] = {
                        left: width * details.pos.x,
                        top: height * details.pos.y,
                    };
                }
                setPlatformPositions(newPositions);
                
                if (playerPosition === null && newPositions[Section.Home]) {
                  setPlayerPosition(newPositions[Section.Home]);
                }
            }
        };

        calculatePositions();
        window.addEventListener('resize', calculatePositions);
        return () => window.removeEventListener('resize', calculatePositions);
    }, [playerPosition]);

    useEffect(() => {
        const activePos = platformPositions[activeSection];
        if (activePos) {
            setPlayerPosition(activePos);
        }
    }, [activeSection, platformPositions]);


    return (
        <div ref={containerRef} className="w-full h-full relative">
            {playerPosition && (
              <div
                  className={`absolute w-8 h-8 ${playerColor.bg} rounded-full shadow-lg ${playerColor.shadow} transition-all duration-700 ease-in-out z-20`}
                  style={{
                      left: playerPosition.left,
                      top: playerPosition.top,
                      transform: 'translate(-50%, -150%)',
                      transitionProperty: 'left, top',
                  }}
              />
            )}

            {Object.keys(SECTION_DETAILS).map(key => {
                const section = key as Section;
                const pos = platformPositions[section];
                if (!pos) return null;

                const details = SECTION_DETAILS[section];
                const isUnlocked = unlockedSections.has(section);
                const isActive = activeSection === section;
                const Icon = details.icon;
                const sectionColor = SECTION_COLORS[section];
                const isHome = section === Section.Home;

                return (
                    <div
                        key={section}
                        className="absolute cursor-pointer group"
                        style={{
                            left: pos.left,
                            top: pos.top,
                            transform: 'translateX(-50%)',
                        }}
                        onClick={() => onSectionSelect(section)}
                    >
                       <div className={`
                            relative transition-all duration-300
                            ${isHome ? 'w-28 h-16' : 'w-24 h-12'}
                            ${isActive ? 'scale-110' : 'group-hover:scale-105'}
                        `}>
                            <div className={`
                                w-full h-full flex flex-col items-center justify-center transition-all duration-300 overflow-hidden
                                ${isUnlocked ? `${sectionColor.bg} text-slate-900 shadow-lg ${sectionColor.shadow}` : 'bg-slate-700 text-slate-400'}
                                ${isHome ? `rounded-xl ${isActive ? '' : 'animate-pulse-slow'}` : 'rounded-lg'}
                            `}>
                                <Icon className="w-5 h-5"/>
                                <span className="text-xs font-bold mt-0.5">{section}</span>
                                {isHome && (
                                  <span className="text-[10px] font-semibold opacity-80 -mt-0.5">Explore</span>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default JumpingGame;