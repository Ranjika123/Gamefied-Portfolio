
import React from 'react';
import type { Position, Project, SkillCategory, KeyItem } from './types';
import { Section } from './types';

// --- GAME CONSTANTS ---

export const GRID_SIZE = 17;
export const INITIAL_PLAYER_POSITION: Position = { x: 1, y: 1 };

export const MAZE_LAYOUT = [
    ['W','W','W','W','W','W','W','W','D','W','W','W','W','W','W','W','W'],
    ['W','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','W'],
    ['W','P','W','W','W','W','W','P','W','P','W','W','W','W','W','P','W'],
    ['W','P','W','K','P','P','P','P','W','P','P','P','P','K','W','P','W'],
    ['W','P','W','P','W','W','W','P','W','P','W','W','W','P','W','P','W'],
    ['W','P','W','P','P','P','P','P','P','P','P','P','P','P','W','P','W'],
    ['W','P','P','P','W','W','W','P','W','P','W','W','W','P','P','P','W'],
    ['W','P','W','P','P','P','P','P','P','P','P','P','P','P','W','P','W'],
    ['D','P','W','P','W','W','W','W','W','W','W','W','W','P','W','P','D'],
    ['W','P','W','P','P','P','P','P','P','P','P','P','P','P','W','P','W'],
    ['W','P','P','P','W','W','W','P','W','P','W','W','W','P','P','P','W'],
    ['W','P','W','P','P','P','P','P','P','P','P','P','P','P','W','P','W'],
    ['W','P','W','P','W','W','W','P','W','P','W','W','W','P','W','P','W'],
    ['W','P','W','K','P','P','P','P','W','P','P','P','P','K','W','P','W'],
    ['W','P','W','W','W','W','W','P','W','P','W','W','W','W','W','P','W'],
    ['W','P','P','P','P','P','P','P','P','P','P','P','P','P','P','P','W'],
    ['W','W','W','W','W','W','W','W','D','W','W','W','W','W','W','W','W'],
];

// --- ICONS ---

export const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
        <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
    </svg>
);

export const UserIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);

export const CodeBracketIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.5 4.5a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15zm4.5 0a.75.75 0 00-1.5 0v15a.75.75 0 001.5 0v-15z" clipRule="evenodd" />
        <path d="M3 10.5a.75.75 0 000 1.5h18a.75.75 0 000-1.5H3z" />
    </svg>
);

export const BriefcaseIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M12.378 1.602a.75.75 0 00-.756 0L3 6.632v10.736c0 .414.336.75.75.75h16.5a.75.75 0 00.75-.75V6.632L12.378 1.602zM12 7.5a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V8.25A.75.75 0 0112 7.5zM11.25 15a.75.75 0 000 1.5h1.5a.75.75 0 000-1.5h-1.5z" />
    </svg>
);

export const EnvelopeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
        <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
    </svg>
);

export const KeyIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 00-6.651 7.906c.067.39-.032.79-.223 1.141l-6.536 9.2a.75.75 0 00.93 1.185l9.2-6.536c.35-.25.75-.322 1.14-.223A6.75 6.75 0 1015.75 1.5zm-3 6a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
    </svg>
);

export const KEY_ITEMS: KeyItem[] = [
    { id: Section.About,    position: { x: 3, y: 13 }, icon: KeyIcon },
    { id: Section.Projects, position: { x: 13, y: 3 },  icon: KeyIcon },
    { id: Section.Skills,   position: { x: 3, y: 3 },  icon: KeyIcon },
    { id: Section.Contact,  position: { x: 13, y: 13 }, icon: KeyIcon },
];

export const SECTION_DOORS: {id: Section, position: Position, icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode}[] = [
    { id: Section.About,    position: { x: 8, y: 0 },  icon: UserIcon },
    { id: Section.Projects, position: { x: 8, y: 16 }, icon: BriefcaseIcon },
    { id: Section.Skills,   position: { x: 0, y: 8 },  icon: CodeBracketIcon },
    { id: Section.Contact,  position: { x: 16, y: 8 }, icon: EnvelopeIcon },
];

export const SECTION_COLORS: { [key in Section]: { bg: string; shadow: string; hex: string; } } = {
    [Section.Home]:     { bg: 'bg-cyan-400',   shadow: 'shadow-cyan-400/50',   hex: '#22d3ee' },
    [Section.About]:    { bg: 'bg-pink-400',   shadow: 'shadow-pink-400/50',   hex: '#f472b6' },
    [Section.Projects]: { bg: 'bg-indigo-400', shadow: 'shadow-indigo-400/50', hex: '#818cf8' },
    [Section.Skills]:   { bg: 'bg-lime-400',   shadow: 'shadow-lime-400/50',   hex: '#a3e635' },
    [Section.Contact]:  { bg: 'bg-amber-400',  shadow: 'shadow-amber-400/50',  hex: '#fbbf24' },
};


// --- PORTFOLIO CONTENT ---

export const PROJECTS: Project[] = [
    {
        title: "UPDATING",
        description: "",
        technologies: [
            { name: "React", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#61DAFB" d="M416 32H96C60.7 32 32 60.7 32 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zM256 426.7c-11.4 0-21.9-4.4-29.9-12.4l-75.4-75.4c-8-8-12.4-18.5-12.4-29.9s4.4-21.9 12.4-29.9l75.4-75.4c8-8 18.5-12.4 29.9-12.4s21.9 4.4 29.9 12.4l75.4 75.4c8 8 12.4 18.5 12.4 29.9s-4.4 21.9-12.4 29.9l-75.4 75.4c-8 8-18.5 12.4-29.9 12.4z"/></svg> },
            { name: "Node.js", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#339933" d="M439.4 69.8L336.6 28.2c-15.6-6-33.1-6-48.7 0L185.1 69.8c-15.6 6-27.8 20.3-29.8 36.9L144 246.3c-2 16.6 4.7 33.1 16.9 44.5l101.6 94.6c13.2 12.3 32.3 12.3 45.5 0l101.6-94.6c12.2-11.4 18.9-27.9 16.9-44.5l-11.3-139.5c-2-16.7-14.2-30.9-29.8-37z"/></svg> },
            { name: "TypeScript", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#3178C6" d="M0 0h512v512H0z"/><path fill="#FFF" d="M120.5 120.5h271v271h-271z"/><path fill="#3178C6" d="M211.7 217.2h50.5v120.7h-50.5zm96.7-5.5c24.6 0 43.1 8.2 55.4 24.3 9.4 12.4 14.1 30.6 14.1 54.6s-4.7 42.2-14.1 54.6c-12.3 16.1-30.8 24.2-55.4 24.2-24.8 0-43.4-8.1-55.9-24.2-9.4-12.4-14.1-30.6-14.1-54.6s4.7-42.2 14.1-54.6c12.5-16.1 31.1-24.3 55.9-24.3z"/></svg> },
            { name: "PostgreSQL", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#336791" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm122.9 333.6c-9.1 8.2-23.1 13.9-42 13.9H205.1v-62.7h59.1c16 0 28.1-4.8 36.3-14.5 8.2-9.6 12.4-22.3 12.4-38.2s-4.1-28.5-12.4-38.2c-8.2-9.6-20.3-14.5-36.3-14.5H205.1V120h131.8c18.9 0 32.9 5.7 42 13.9 9.1 8.2 13.7 20.2 13.7 36.1 0 16.3-4.6 28.5-13.8 36.9 11.2 6.8 19.3 18.2 24.2 34.1 5 15.9 7.4 32.7 7.4 50.4 0 15.9-4.5 28.1-13.5 36.2z"/></svg> }
        ],
        repoUrl: "",
        image: "https://images.app.goo.gl/1Pus9MM6Ymma6fXX6"
    },
    /*{
        title: "Data Visualization Dashboard",
        description: "An interactive dashboard for visualizing complex datasets using D3.js and Recharts. Features dynamic charts, data filtering, and a responsive design for various screen sizes.",
        technologies: [
            { name: "React", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#61DAFB" d="M416 32H96C60.7 32 32 60.7 32 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zM256 426.7c-11.4 0-21.9-4.4-29.9-12.4l-75.4-75.4c-8-8-12.4-18.5-12.4-29.9s4.4-21.9 12.4-29.9l75.4-75.4c8-8 18.5-12.4 29.9-12.4s21.9 4.4 29.9 12.4l75.4 75.4c8 8 12.4 18.5 12.4 29.9s-4.4 21.9-12.4 29.9l-75.4 75.4c-8 8-18.5 12.4-29.9 12.4z"/></svg> },
            { name: "D3.js", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#F9A03C" d="M128.3 352.2c27.1 0 48.2-1.7 63.5-5.2 15.3-3.4 27.2-9.4 35.8-17.9 8.6-8.5 12.9-19.1 12.9-31.6 0-13.2-4.8-24.4-14.3-33.6-9.5-9.2-22.9-15.6-40.1-19.1s-37.1-5.3-59.5-5.3H128.3v112.7zm-20.7 20.7V139.3h105.1c32.8 0 60.8 4.1 84.1 12.4 23.3 8.3 41.5 21.6 54.7 40s19.8 41.2 19.8 68.4c0 23.3-6.1 44.5-18.4 63.4-12.3 19-30.1 33.7-53.5 44.3-23.4 10.6-53 15.9-88.7 15.9H107.6z"/></svg> },
            { name: "Tailwind CSS", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#38BDF8" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zM369.3 203.8c-10.8 49.3-50.6 89.1-99.9 99.9-49.3 10.8-99.1-12.4-123.7-54.6-24.6-42.2-14.7-96.1 23.5-125.7 38.2-29.6 89.6-29.6 127.8 0 17.2 13.3 28.5 32.8 32.3 54.3 2.6 15.1-1.3 30.6-10 42.7zm-73.4-69.3c-14.7-14.7-38.5-14.7-53.2 0-14.7 14.7-14.7 38.5 0 53.2 14.7 14.7 38.5 14.7 53.2 0 14.7-14.7 14.7-38.5 0-53.2z"/></svg> }
        ],
        liveDemoUrl: "https://github.com/ranjika123",
        repoUrl: "https://github.com/ranjika123",
        image: "https://picsum.photos/seed/project2/500/300"
    },
    {
        title: "AI-Powered Chatbot",
        description: "A smart chatbot using the Gemini API for natural language understanding. The bot can answer user queries in real-time, integrated into a sleek, responsive chat interface.",
        technologies: [
            { name: "React", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#61DAFB" d="M416 32H96C60.7 32 32 60.7 32 96v320c0 35.3 28.7 64 64 64h320c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64zM256 426.7c-11.4 0-21.9-4.4-29.9-12.4l-75.4-75.4c-8-8-12.4-18.5-12.4-29.9s4.4-21.9 12.4-29.9l75.4-75.4c8-8 18.5-12.4 29.9-12.4s21.9 4.4 29.9 12.4l75.4 75.4c8 8 12.4 18.5 12.4 29.9s-4.4 21.9-12.4 29.9l-75.4 75.4c-8 8-18.5 12.4-29.9 12.4z"/></svg> },
            { name: "Gemini API", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-blue-400"><path d="M12.942 3.322a1.5 1.5 0 0 0-1.884 0l-8.25 5.25a1.5 1.5 0 0 0-.858 1.346v6.164a1.5 1.5 0 0 0 .858 1.346l8.25 5.25a1.5 1.5 0 0 0 1.884 0l8.25-5.25a1.5 1.5 0 0 0 .858-1.346V9.918a1.5 1.5 0 0 0-.858-1.346l-8.25-5.25Z" /></svg> },
            { name: "Vite", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-6 h-6"><path fill="#646CFF" d="M256 8C119.1 8 8 119.1 8 256s111.1 248 248 248 248-111.1 248-248S392.9 8 256 8zm101.6 308.3L256 405.9l-101.6-89.6L256 226.7l101.6 89.6zM256 106.1l-101.6 89.6L256 285.3l101.6-89.6L256 106.1z"/></svg> }
        ],
        repoUrl: "https://github.com/ranjika123",
        image: "https://picsum.photos/seed/project3/500/300"
    },*/
];

export const SKILLS: SkillCategory[] = [
    {
        name: "Languages",
        skills: [
            { name: "TypeScript", level: 95 },
            { name: "JavaScript (ES6+)", level: 90 },
            { name: "HTML5 & CSS3", level: 85 },
            { name: "Python", level: 70 },
        ],
    },
    {
        name: "Frameworks & Libraries",
        skills: [
            { name: "React", level: 95 },
            { name: "Next.js", level: 80 },
            { name: "Node.js", level: 85 },
            { name: "Tailwind CSS", level: 98 },
            { name: "D3.js", level: 75 },
        ],
    },
    {
        name: "Tools & Platforms",
        skills: [
            { name: "Git & GitHub", level: 90 },
            { name: "Docker", level: 70 },
            { name: "Vercel", level: 85 },
            { name: "Figma", level: 65 },
        ],
    },
];
