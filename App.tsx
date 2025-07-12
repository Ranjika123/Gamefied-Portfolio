import React, { useState, useEffect, useCallback } from 'react';
import { Section, Position } from './types';
import { HomeIcon, UserIcon, BriefcaseIcon, CodeBracketIcon, EnvelopeIcon, SECTION_COLORS, INITIAL_PLAYER_POSITION, GRID_SIZE, MAZE_LAYOUT, KEY_ITEMS } from './constants';
import PortfolioView from './components/PortfolioView';
import JumpingGame from './components/JumpingGame';
import ShootingGame from './components/ShootingGame';
import GameGrid from './components/GameGrid';
import ParticleBackground from './components/ParticleBackground';

const SECTION_ICONS: { [key in Section]: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode } = {
  [Section.Home]: HomeIcon,
  [Section.About]: UserIcon,
  [Section.Projects]: BriefcaseIcon,
  [Section.Skills]: CodeBracketIcon,
  [Section.Contact]: EnvelopeIcon,
};

// Hook to detect mobile viewport, integrated here to avoid creating a new directory
const useIsMobile = (breakpoint = 1024) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpoint);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};


function App() {
  const [activeSection, setActiveSection] = useState<Section>(Section.Home);
  const [unlockedSections, setUnlockedSections] = useState<Set<Section>>(new Set([Section.Home]));
  const [showNotification, setShowNotification] = useState<string | null>(null);
  const [playerColor, setPlayerColor] = useState(SECTION_COLORS[Section.Home]);
  const isMobile = useIsMobile();
  
  // Game state
  const [selectedGame, setSelectedGame] = useState<'shooter' | 'maze'>('shooter');
  const [playerPosition, setPlayerPosition] = useState<Position>(INITIAL_PLAYER_POSITION);


  const handleSectionSelect = useCallback((section: Section) => {
      if (!unlockedSections.has(section)) {
          setUnlockedSections(prev => new Set(prev).add(section));
      }
      setActiveSection(section);
      setPlayerColor(SECTION_COLORS[section]);
  }, [unlockedSections]);


  const resetGame = useCallback(() => {
    setUnlockedSections(new Set([Section.Home]));
    setActiveSection(Section.Home);
    setPlayerColor(SECTION_COLORS[Section.Home]);
    setPlayerPosition(INITIAL_PLAYER_POSITION);
    setShowNotification("Game Reset!");
    setTimeout(() => setShowNotification(null), 2000);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (isMobile || selectedGame !== 'maze') return;

    setPlayerPosition(prev => {
      let { x, y } = prev;
      switch (e.key) {
        case 'ArrowUp': y--; break;
        case 'ArrowDown': y++; break;
        case 'ArrowLeft': x--; break;
        case 'ArrowRight': x++; break;
        default: return prev;
      }

      if (x < 0 || x >= GRID_SIZE || y < 0 || y >= GRID_SIZE) return prev;
      
      const destCell = MAZE_LAYOUT[y][x];
      if (destCell === 'W') return prev;
      
      // Allow movement through door cells but don't check for keys on them
      if (destCell !== 'D') {
          const key = KEY_ITEMS.find(k => k.position.x === x && k.position.y === y);
          if (key && !unlockedSections.has(key.id)) {
              handleSectionSelect(key.id);
          }
      }
      
      return { x, y };
    });
  }, [isMobile, selectedGame, unlockedSections, handleSectionSelect]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);


  const NavButton = ({ section }: { section: Section }) => {
    const isUnlocked = unlockedSections.has(section);
    const isActive = activeSection === section;
    const Icon = SECTION_ICONS[section];

    return (
      <button
        onClick={() => isUnlocked && handleSectionSelect(section)}
        disabled={!isUnlocked}
        className={`flex-1 flex flex-col sm:flex-row items-center justify-center p-2 sm:p-3 text-sm font-bold transition-all duration-300 ease-in-out rounded-lg
          ${isActive ? 'bg-cyan-500 text-slate-900 shadow-lg shadow-cyan-500/30' : ''}
          ${isUnlocked ? 'bg-slate-700 hover:bg-cyan-600 cursor-pointer' : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
        `}
      >
        <Icon className="w-5 h-5 mb-1 sm:mb-0 sm:mr-2" />
        <span className="hidden sm:inline">{section}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen bg-slate-900 overflow-hidden">
      {/* Notification Popup for Reset */}
      {showNotification && (
        <div className="absolute top-5 right-5 bg-red-600 text-white py-2 px-4 rounded-lg shadow-lg z-50 animate-fade-in-out">
          {showNotification}
        </div>
      )}

      {/* Game Panel */}
      <div className="relative flex-shrink-0 w-full h-[45vh] lg:h-screen lg:w-[450px] xl:w-[550px] p-4 lg:p-6 flex flex-col bg-slate-900/50 border-b-2 lg:border-b-0 lg:border-r-2 border-cyan-500/30">
        
        <div className="text-center mb-4">
          <h1 className="text-2xl xl:text-3xl font-bold text-cyan-400">Ranjika Nethpriya Profile</h1>
          <p className="text-slate-400 text-sm mt-1">
            {isMobile
              ? "Tap a platform to jump and explore."
              : selectedGame === 'shooter'
                ? "Aim with your mouse and click to shoot targets."
                : "Use arrow keys to move and collect keys."
            }
          </p>
        </div>
        <div className="flex-grow flex items-center justify-center min-h-0">
            {isMobile ? (
                 <JumpingGame
                    unlockedSections={unlockedSections}
                    activeSection={activeSection}
                    playerColor={playerColor}
                    onSectionSelect={handleSectionSelect}
                 />
            ) : (
                <>
                    {selectedGame === 'shooter' && (
                        <ShootingGame
                            unlockedSections={unlockedSections}
                            onSectionSelect={handleSectionSelect}
                        />
                    )}
                    {selectedGame === 'maze' && (
                        <GameGrid
                            unlockedSections={unlockedSections}
                            playerPosition={playerPosition}
                            playerColor={playerColor}
                        />
                    )}
                </>
            )}
        </div>
        <div className="mt-4 flex justify-center items-center space-x-4">
            {!isMobile && (
              <>
                <div className="flex items-center bg-slate-800 rounded-lg p-1">
                  <button 
                      onClick={() => setSelectedGame('shooter')}
                      className={`px-3 py-1 text-sm font-bold rounded-md transition-colors ${selectedGame === 'shooter' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700'}`}
                  >
                      Shooter
                  </button>
                  <button 
                      onClick={() => setSelectedGame('maze')}
                      className={`px-3 py-1 text-sm font-bold rounded-md transition-colors ${selectedGame === 'maze' ? 'bg-cyan-500 text-slate-900' : 'text-slate-300 hover:bg-slate-700'}`}
                  >
                      Maze
                  </button>
                </div>
                <button
                    onClick={resetGame}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    Reset Game
                </button>
              </>
            )}
        </div>
      </div>

      {/* Content Panel */}
      <div className="flex-grow flex flex-col p-4 lg:p-8 overflow-y-auto relative content-panel">
        <ParticleBackground />
        <nav className="w-full mb-6 z-10">
            <div className="flex space-x-2 bg-slate-800 p-2 rounded-xl">
                {Object.values(Section).map(section => (
                    <NavButton key={section} section={section} />
                ))}
            </div>
        </nav>
        <main className="flex-grow z-10">
          <PortfolioView activeSection={activeSection} isMobile={isMobile} />
        </main>
      </div>
    </div>
  );
}

export default App;