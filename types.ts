
export enum Section {
  Home = 'Home',
  About = 'About',
  Projects = 'Projects',
  Skills = 'Skills',
  Contact = 'Contact',
}

export interface Position {
  x: number;
  y: number;
}

export interface KeyItem {
  id: Section;
  position: Position;
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode;
}

export interface Project {
  title: string;
  description: string;
  technologies: { name: string; icon: React.ReactNode }[];
  liveDemoUrl?: string;
  repoUrl: string;
  image: string;
}

export interface SkillCategory {
    name: string;
    skills: { name: string; level: number }[];
}
