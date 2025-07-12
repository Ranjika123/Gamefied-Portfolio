import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Section } from '../types';
import { HomeIcon, UserIcon, BriefcaseIcon, CodeBracketIcon, EnvelopeIcon, SECTION_COLORS } from '../constants';

interface ShootingGameProps {
    unlockedSections: Set<Section>;
    onSectionSelect: (section: Section) => void;
}

const SECTION_DETAILS: { [key in Section]: { icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode; } } = {
    [Section.Home]: { icon: HomeIcon },
    [Section.About]: { icon: UserIcon },
    [Section.Projects]: { icon: BriefcaseIcon },
    [Section.Skills]: { icon: CodeBracketIcon },
    [Section.Contact]: { icon: EnvelopeIcon },
};

type Target = {
    id: Section;
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    ref: React.RefObject<HTMLDivElement>;
};

const CrackIcon = (props: { className?: string }) => (
    <svg className={`absolute w-1/2 h-1/2 text-slate-900/40 pointer-events-none ${props.className}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 4 L10 10 L8 12 L12 16 L14 14 L20 20" />
    </svg>
);


const ShootingGame: React.FC<ShootingGameProps> = ({ unlockedSections, onSectionSelect }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [targets, setTargets] = useState<Target[]>([]);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const animationFrameId = useRef<number | null>(null);
    const [shotCounts, setShotCounts] = useState<Partial<Record<Section, number>>>({});

    const createInitialTargets = useCallback((width: number, height: number) => {
        const sections = Object.values(Section).filter(s => s !== Section.Home);
        return sections.map((section) => ({
            id: section,
            x: Math.random() * (width - 80) + 40,
            y: Math.random() * (height - 80) + 40,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            size: 80,
            ref: React.createRef<HTMLDivElement>(),
        }));
    }, []);

    useEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setTargets(createInitialTargets(width, height));
            setShotCounts({});
        }
    }, [createInitialTargets]);
    
    useEffect(() => {
      if (unlockedSections.size === 1 && unlockedSections.has(Section.Home)) {
        setShotCounts({});
        if (containerRef.current) {
             const { width, height } = containerRef.current.getBoundingClientRect();
             setTargets(createInitialTargets(width, height));
        }
      }
    }, [unlockedSections, createInitialTargets])

    useEffect(() => {
        const gameLoop = () => {
            if (containerRef.current) {
                const { width, height } = containerRef.current.getBoundingClientRect();
                setTargets(prevTargets => prevTargets.map(target => {
                    let newX = target.x + target.vx;
                    let newY = target.y + target.vy;
                    let newVx = target.vx;
                    let newVy = target.vy;

                    if (unlockedSections.has(target.id)) {
                        newVx *= 0.98; // Slow down unlocked targets
                        newVy *= 0.98;
                    }

                    if (newX <= 0 || newX >= width - target.size) newVx *= -1;
                    if (newY <= 0 || newY >= height - target.size) newVy *= -1;

                    return { ...target, x: newX, y: newY, vx: newVx, vy: newVy };
                }));
            }
            animationFrameId.current = requestAnimationFrame(gameLoop);
        };
        animationFrameId.current = requestAnimationFrame(gameLoop);
        return () => {
            if (animationFrameId.current !== null) {
                cancelAnimationFrame(animationFrameId.current);
            }
        };
    }, [unlockedSections]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
        }
    };

    const createShatterEffect = useCallback((x: number, y: number) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const NUM_PARTICLES = 8;
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-1.5 h-1.5 bg-slate-400 rounded-full pointer-events-none z-10';
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.transform = `translate(-50%, -50%)`;
            particle.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
            container.appendChild(particle);

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 30 + 20;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => {
                particle.remove();
            }, 500);
        }
    }, []);

    const createHitSparkleEffect = useCallback((x: number, y: number, color: string) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const NUM_PARTICLES = 15;
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute w-2 h-2 rounded-full pointer-events-none z-10';
            particle.style.backgroundColor = color;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.transform = `translate(-50%, -50%)`;
            particle.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
            container.appendChild(particle);

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 40 + 30;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => {
                particle.remove();
            }, 600);
        }
    }, []);
    
    const createTargetShatterEffect = useCallback((x: number, y: number, color: string) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const NUM_PARTICLES = 50;
        for (let i = 0; i < NUM_PARTICLES; i++) {
            const particle = document.createElement('div');
            particle.className = 'absolute rounded-full pointer-events-none z-10';
            particle.style.backgroundColor = color;
            particle.style.width = `${Math.random() * 5 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.left = `${x}px`;
            particle.style.top = `${y}px`;
            particle.style.transform = `translate(-50%, -50%)`;
            particle.style.transition = 'transform 0.8s cubic-bezier(0.1, 0.7, 0.3, 1), opacity 0.8s linear';
            container.appendChild(particle);

            const angle = Math.random() * 2 * Math.PI;
            const distance = Math.random() * 100 + 60;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;

            requestAnimationFrame(() => {
                particle.style.transform = `translate(${tx}px, ${ty}px) scale(0)`;
                particle.style.opacity = '0';
            });

            setTimeout(() => {
                particle.remove();
            }, 800);
        }
    }, []);

    const handleShoot = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const clickX = mousePos.x;
        const clickY = mousePos.y;

        const projectile = document.createElement('div');
        projectile.className = 'absolute w-2 h-4 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50 pointer-events-none z-10';
        
        const startX = container.clientWidth / 2;
        const startY = container.clientHeight - 20;
        
        projectile.style.left = `${startX - 4}px`;
        projectile.style.top = `${startY}px`;
        projectile.style.transition = 'transform 0.5s linear';
        
        container.appendChild(projectile);

        const angle = Math.atan2(clickY - startY, clickX - startX);
        const distance = Math.hypot(container.clientWidth, container.clientHeight);

        const endX = startX + distance * Math.cos(angle);
        const endY = startY + distance * Math.sin(angle);
        
        requestAnimationFrame(() => {
             projectile.style.transform = `translate(${endX - startX}px, ${endY - startY}px)`;
        });

        const masterTimeoutId = window.setTimeout(() => {
            projectile.remove();
            clearInterval(checkCollision);
        }, 500);

        const checkCollision = setInterval(() => {
            if (!containerRef.current) {
                clearInterval(checkCollision);
                clearTimeout(masterTimeoutId);
                return;
            }
            const pRect = projectile.getBoundingClientRect();
            const cRect = containerRef.current.getBoundingClientRect();

            // Target collision
            for (const target of targets) {
                if (target.ref.current) {
                    const tRect = target.ref.current.getBoundingClientRect();
                    if (pRect.left < tRect.right && pRect.right > tRect.left && pRect.top < tRect.bottom && pRect.bottom > tRect.top) {
                        projectile.remove();
                        clearInterval(checkCollision);
                        clearTimeout(masterTimeoutId);

                        const hits = (shotCounts[target.id] || 0) + 1;
                        const isUnlocked = unlockedSections.has(target.id);
                        
                        if (isUnlocked && hits > 4) {
                            const centerX = (tRect.left - cRect.left) + tRect.width / 2;
                            const centerY = (tRect.top - cRect.top) + tRect.height / 2;
                            createTargetShatterEffect(centerX, centerY, SECTION_COLORS[target.id].hex);
                            
                            setTargets(prev => prev.filter(t => t.id !== target.id));
                            setShotCounts(prev => {
                                const newCounts = { ...prev };
                                delete newCounts[target.id];
                                return newCounts;
                            });
                        } else {
                            const impactX = (tRect.left - cRect.left) + tRect.width / 2;
                            const impactY = (tRect.top - cRect.top) + tRect.height / 2;
                            createHitSparkleEffect(impactX, impactY, SECTION_COLORS[target.id].hex);
                            
                            const impactForce = 2.5;
                            const impactVx = Math.cos(angle) * impactForce;
                            const impactVy = Math.sin(angle) * impactForce;
                            
                            setTargets(prev => prev.map(t => 
                                t.id === target.id 
                                    ? { ...t, vx: t.vx + impactVx, vy: t.vy + impactVy }
                                    : t
                            ));
                            
                            setShotCounts(prev => ({ ...prev, [target.id]: hits }));

                            if (!isUnlocked) {
                               onSectionSelect(target.id);
                            }
                        }
                        return;
                    }
                }
            }

            // Wall collision
            if (pRect.top <= cRect.top || pRect.bottom >= cRect.bottom || pRect.left <= cRect.left || pRect.right >= cRect.right) {
                const impactX = pRect.left - cRect.left + pRect.width / 2;
                const impactY = pRect.top - cRect.top + pRect.height / 2;
                
                const clampedX = Math.max(2, Math.min(cRect.width - 2, impactX));
                const clampedY = Math.max(2, Math.min(cRect.height - 2, impactY));

                createShatterEffect(clampedX, clampedY);
                
                projectile.remove();
                clearInterval(checkCollision);
                clearTimeout(masterTimeoutId);
            }
        }, 16);
    }, [mousePos, targets, unlockedSections, shotCounts, onSectionSelect, createShatterEffect, createHitSparkleEffect, createTargetShatterEffect]);

    return (
        <div 
            ref={containerRef} 
            className="w-full h-full relative overflow-hidden bg-slate-800/50 rounded-lg cursor-crosshair"
            onMouseMove={handleMouseMove}
            onClick={handleShoot}
        >
            {/* Crosshair */}
            <div 
                className="absolute w-6 h-6 border-2 border-red-500 rounded-full pointer-events-none z-10"
                style={{ left: mousePos.x, top: mousePos.y, transform: 'translate(-50%, -50%)' }}
            />

            {/* Targets */}
            {targets.map(target => {
                const isUnlocked = unlockedSections.has(target.id);
                const sectionColor = SECTION_COLORS[target.id];
                const Icon = SECTION_DETAILS[target.id].icon;
                const hits = shotCounts[target.id] || 0;
                const showCrack1 = isUnlocked && hits > 1;
                const showCrack2 = isUnlocked && hits > 3;

                return (
                    <div
                        key={target.id}
                        ref={target.ref}
                        className={`absolute flex flex-col items-center justify-center rounded-full transition-all duration-500 pointer-events-none
                            ${isUnlocked ? `${sectionColor.bg} text-slate-900 shadow-xl ${sectionColor.shadow}` : 'bg-slate-600 text-slate-300 hover:bg-slate-500'}
                        `}
                        style={{
                            width: target.size,
                            height: target.size,
                            transform: `translate(${target.x}px, ${target.y}px)`,
                            willChange: 'transform'
                        }}
                    >
                        {showCrack1 && <CrackIcon className="top-0 left-0" />}
                        {showCrack2 && <CrackIcon className="bottom-0 right-0 transform rotate-180" />}
                        <Icon className="w-8 h-8"/>
                        <span className="text-xs font-bold mt-1">{target.id}</span>
                    </div>
                );
            })}
            
            {/* Shooter Base */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-8 bg-slate-700 rounded-t-full border-t-4 border-cyan-400 z-0" />
        </div>
    );
};

export default ShootingGame;