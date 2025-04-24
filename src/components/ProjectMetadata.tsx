import React from 'react';

interface ProjectMetadataProps {
  projectName: string;
  setProjectName: (name: string) => void;
  projectDescription: string;
  setProjectDescription: (description: string) => void;
}

const ProjectMetadata: React.FC<ProjectMetadataProps> = ({
  projectName,
  setProjectName,
  projectDescription,
  setProjectDescription
}) => {
  return (
    <div className="bg-[#3C3F41] rounded-lg p-6 mb-6 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Project Metadata</h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="project-name" className="block text-sm font-medium text-gray-300 mb-1">
            Project Name
          </label>
          <input
            type="text"
            id="project-name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="w-full px-3 py-2 bg-[#2B2B2B] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
            placeholder="my-robot-project"
          />
        </div>

        <div>
          <label htmlFor="project-description" className="block text-sm font-medium text-gray-300 mb-1">
            Description
          </label>
          <textarea
            id="project-description"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 bg-[#2B2B2B] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
            placeholder="Project description"
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectMetadata;
