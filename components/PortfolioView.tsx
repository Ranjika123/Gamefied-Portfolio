import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Section } from '../types';
import { PROJECTS, SKILLS } from '../constants';
import ProjectCard from './ProjectCard';
import SkillBar from './SkillBar';
import { getDevJoke } from '../services/geminiService';

interface PortfolioViewProps {
  activeSection: Section;
  isMobile: boolean;
}

const PortfolioView: React.FC<PortfolioViewProps> = ({ activeSection, isMobile }) => {
  const [joke, setJoke] = useState<string>('');
  const [isLoadingJoke, setIsLoadingJoke] = useState<boolean>(false);
  const [isBubbleVisible, setIsBubbleVisible] = useState(true);
  const viewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsBubbleVisible(true);
  }, [activeSection]);

  const createPopEffect = useCallback((x: number, y: number) => {
    if (!viewRef.current) return;
    const container = viewRef.current;
    const NUM_PARTICLES = 10;
    for (let i = 0; i < NUM_PARTICLES; i++) {
        const particle = document.createElement('div');
        particle.className = 'absolute w-1.5 h-1.5 bg-cyan-200/60 rounded-full pointer-events-none z-30';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.transform = 'translate(-50%, -50%)';
        particle.style.transition = 'transform 0.5s cubic-bezier(0.1, 0.9, 0.2, 1), opacity 0.5s linear';
        container.appendChild(particle);

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 40 + 20;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        requestAnimationFrame(() => {
            particle.style.transform = `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(0)`;
            particle.style.opacity = '0';
        });

        setTimeout(() => {
            particle.remove();
        }, 500);
    }
  }, []);

  const handleBubblePop = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const bubble = event.currentTarget;
    const rect = bubble.getBoundingClientRect();
    const containerRect = viewRef.current?.getBoundingClientRect();

    if (!containerRect) return;

    const x = rect.left - containerRect.left + rect.width / 2;
    const y = rect.top - containerRect.top + rect.height / 2;
    
    createPopEffect(x, y);
    setIsBubbleVisible(false);

    setTimeout(() => {
      setIsBubbleVisible(true);
    }, 7000);
  }, [createPopEffect]);

  const fetchJoke = useCallback(async () => {
    setIsLoadingJoke(true);
    setJoke('');
    try {
      const newJoke = await getDevJoke();
      setJoke(newJoke);
    } catch (error) {
      console.error(error);
      setJoke('Oops! The joke machine is broken. Please try again later.');
    } finally {
      setIsLoadingJoke(false);
    }
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case Section.Home:
        return (
          <div className="text-center p-8 bg-slate-800/50 rounded-lg">
            <h2 className="text-4xl font-bold text-cyan-400 mb-4">Welcome to My World</h2>
            <p className="text-lg text-slate-300 mb-6 max-w-2xl mx-auto">
              This isn't just a portfolio; it's an interactive journey. Use the game on your left to explore my work. Collect the keys to unlock my story, skills, and projects.
            </p>
            <p className="text-md text-slate-400">Happy exploring!</p>
          </div>
        );
      case Section.About:
        return (
          <div className="flex flex-col md:flex-row items-center gap-8 p-4">
            <img 
              src="src\photo_2025-05-07_23-29-50.jpg" 
              alt="Developer's headshot"
              className="w-48 h-48 rounded-full object-cover border-4 border-rose-800 shadow-lg"
            />
            <div className="max-w-xl">
              <h2 className="text-3xl font-bold text-cyan-400 mb-3">About Me</h2>
              <p className="text-slate-300 mb-4">
                I'm a passionate front-end developer with a love for creating beautiful, intuitive, and performant user interfaces. With a strong foundation in React and modern web technologies, I enjoy turning complex problems into elegant solutions.
              </p>
              <p className="text-slate-300">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or brewing the perfect cup of coffee.
              </p>
            </div>
          </div>
        );
      case Section.Projects:
        return (
          <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-6 text-center">My Projects</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
              {PROJECTS.map((project, index) => (
                <ProjectCard key={index} project={project} />
              ))}
            </div>
          </div>
        );
      case Section.Skills:
        return (
          <div>
            <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Technical Skills</h2>
            <div className="max-w-4xl mx-auto space-y-8">
                {SKILLS.map(category => (
                    <div key={category.name} className="bg-slate-800/50 p-6 rounded-lg">
                        <h3 className="text-xl font-bold text-slate-200 mb-4">{category.name}</h3>
                        <div className="space-y-4">
                            {category.skills.map(skill => <SkillBar key={skill.name} skill={skill.name} level={skill.level} />)}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        );
      case Section.Contact:
        return (
           <div className="text-center p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold text-cyan-400 mb-4">Get In Touch</h2>
              <p className="text-slate-300 mb-8">
                  I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team. Feel free to reach out!
              </p>
              <div className="text-lg text-cyan-300 mb-8 hover:text-cyan-200 transition-colors">
                  <a href="mailto:ranjikaneth2005@gmail.com">ranjikaneth2005@gmail.com</a>
              </div>
              <div className="flex justify-center space-x-6 mb-12">
                  <a href="https://github.com/ranjika123" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">GitHub</a>
                  <a href="https://www.linkedin.com/in/ranjika-nethpriya/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-cyan-400 transition-colors">LinkedIn</a>
              </div>
              
              <div className="border-t border-slate-700 pt-8">
                  <h3 className="text-xl font-semibold text-slate-300 mb-4">Need a Laugh?</h3>
                  <button 
                      onClick={fetchJoke}
                      disabled={isLoadingJoke}
                      className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-slate-600"
                  >
                      {isLoadingJoke ? 'Thinking...' : 'Get a Dev Joke'}
                  </button>
                  {joke && (
                      <div className="mt-6 p-4 bg-slate-800 rounded-lg text-slate-300 min-h-[6rem] flex items-center justify-center">
                          <p>{joke}</p>
                      </div>
                  )}
              </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div ref={viewRef} className="w-full h-full relative">
        {isMobile && isBubbleVisible && (
            <div
              onClick={handleBubblePop}
              className="absolute top-4 right-4 z-20 w-12 h-12 bg-cyan-400/30 rounded-full border-2 border-cyan-300/50 cursor-pointer hover:scale-110 transition-transform animate-float-bubble"
              aria-label="Pop the bubble"
            >
              <div className="absolute top-2 left-3 w-3 h-3 bg-white/40 rounded-full blur-sm"></div>
              <div className="absolute top-4 left-5 w-1.5 h-1.5 bg-white/30 rounded-full blur-sm"></div>
            </div>
        )}
        {renderContent()}
    </div>
  );
};

export default PortfolioView;