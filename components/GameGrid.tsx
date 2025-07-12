
import React from 'react';
import { Section, Position } from '../types';
import { MAZE_LAYOUT, GRID_SIZE, KEY_ITEMS, SECTION_DOORS, SECTION_COLORS } from '../constants';

interface GameGridProps {
    unlockedSections: Set<Section>;
    playerPosition: Position;
    playerColor: { bg: string; shadow:string; };
}

const GameGrid: React.FC<GameGridProps> = ({ unlockedSections, playerPosition, playerColor }) => {
    return (
        <div className="relative w-full max-w-full max-h-full aspect-square bg-slate-800/50 rounded-lg p-1 sm:p-2">
            <div className="grid h-full w-full" style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` }}>
                {MAZE_LAYOUT.flat().map((cell, index) => {
                    const x = index % GRID_SIZE;
                    const y = Math.floor(index / GRID_SIZE);
                    const isWall = cell === 'W';
                    const isDoor = cell === 'D';

                    let cellContent = null;
                    if (isWall) {
                        cellContent = <div className="w-full h-full bg-slate-700 rounded-sm"></div>;
                    } else if (isDoor) {
                        const door = SECTION_DOORS.find(d => d.position.x === x && d.position.y === y);
                        if (door) {
                            const isUnlocked = unlockedSections.has(door.id);
                            const sectionColor = SECTION_COLORS[door.id];
                            cellContent = (
                                <div className={`w-full h-full flex items-center justify-center rounded-sm transition-colors duration-300
                                    ${isUnlocked ? `${sectionColor.bg} text-slate-900 shadow-lg ${sectionColor.shadow}` : 'bg-slate-600 text-slate-400'}
                                `}>
                                    <door.icon className="w-3/4 h-3/4" />
                                </div>
                            );
                        }
                    }

                    return (
                        <div key={`${x}-${y}`} className="relative">
                            {cellContent}
                        </div>
                    );
                })}
            </div>

            {/* Keys - Rendered absolutely over the grid */}
            {KEY_ITEMS.map(key => !unlockedSections.has(key.id) && (
                <div
                    key={key.id}
                    className="absolute text-amber-400 pointer-events-none"
                    style={{
                        left: `${(key.position.x / GRID_SIZE) * 100}%`,
                        top: `${(key.position.y / GRID_SIZE) * 100}%`,
                        width: `${(1 / GRID_SIZE) * 100}%`,
                        height: `${(1 / GRID_SIZE) * 100}%`,
                    }}
                >
                    <key.icon className="w-full h-full p-1 animate-pulse" />
                </div>
            ))}
            
            {/* Player */}
            <div
                className={`absolute ${playerColor.bg} rounded-full shadow-lg ${playerColor.shadow} transition-all duration-150 ease-linear pointer-events-none`}
                style={{
                    left: `${(playerPosition.x / GRID_SIZE) * 100}%`,
                    top: `${(playerPosition.y / GRID_SIZE) * 100}%`,
                    width: `${(1 / GRID_SIZE) * 100}%`,
                    height: `${(1 / GRID_SIZE) * 100}%`,
                    transform: 'scale(0.7)'
                }}
            />
        </div>
    );
};

export default GameGrid;
