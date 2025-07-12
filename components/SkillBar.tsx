
import React from 'react';

interface SkillBarProps {
  skill: string;
  level: number; // 0-100
}

const SkillBar: React.FC<SkillBarProps> = ({ skill, level }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-slate-300">{skill}</span>
        <span className="text-xs font-medium text-cyan-400">{level}%</span>
      </div>
      <div className="w-full bg-slate-700 rounded-full h-2.5">
        <div 
          className="bg-cyan-500 h-2.5 rounded-full" 
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SkillBar;
