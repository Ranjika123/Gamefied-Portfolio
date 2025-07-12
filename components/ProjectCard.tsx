
import React from 'react';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/20 transition-all duration-300 flex flex-col">
      <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-slate-100 mb-2">{project.title}</h3>
        <p className="text-slate-400 text-sm mb-4 flex-grow">{project.description}</p>
        
        <div className="mb-4">
            <h4 className="text-sm font-semibold text-slate-300 mb-2">Technologies Used:</h4>
            <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                    <div key={index} className="flex items-center bg-slate-700 px-2 py-1 rounded-full text-xs text-cyan-300">
                        {tech.icon}
                        <span className="ml-1.5">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
        
        <div className="mt-auto flex justify-end space-x-4">
          {project.liveDemoUrl && (
            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
              Live Demo
            </a>
          )}
          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-colors">
            GitHub Repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
