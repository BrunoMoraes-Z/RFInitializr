import React from 'react';
import { Library } from '../data/initializer-data';

interface ProjectSummaryProps {
  projectName: string;
  pythonVersion: string;
  robotVersion: string;
  selectedLibraries: Library[];
}

const ProjectSummary: React.FC<ProjectSummaryProps> = ({
  projectName,
  pythonVersion,
  robotVersion,
  selectedLibraries
}) => {
  return (
    <div className="bg-[#2D2F30] rounded-lg p-4 mb-4">
      <h3 className="text-sm font-medium text-gray-300 mb-2">Project Summary</h3>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-400">Name:</span>
          <span className="text-white font-mono">{projectName}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Python:</span>
          <span className="text-white font-mono">{pythonVersion}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Robot Framework:</span>
          <span className="text-white font-mono">{robotVersion}</span>
        </div>
        <div>
          <span className="text-gray-400">Libraries ({selectedLibraries.length}):</span>
          <div className="mt-1 flex flex-wrap gap-1">
            {selectedLibraries.map(lib => (
              <span
                key={lib.id}
                className="px-2 py-0.5 text-xs rounded-full bg-[#324353] text-[#A5C0E4]"
              >
                {lib.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
