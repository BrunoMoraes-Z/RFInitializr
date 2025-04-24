import { Download } from 'lucide-react';
import React from 'react';

interface GenerateProjectProps {
  onGenerate: () => void;
  projectName: string;
  isGenerating: boolean;
}

const GenerateProject: React.FC<GenerateProjectProps> = ({
  onGenerate,
  projectName,
  isGenerating
}) => {
  return (
    <div className="bg-[#3C3F41] rounded-lg p-6 mb-6 shadow-lg">
      <div className="flex flex-col sm:flex-row items-center justify-between">
        <div className="mb-4 sm:mb-0">
          <h2 className="text-lg font-semibold text-white">Generate Project</h2>
          <p className="text-sm text-gray-400 mt-1">
            Click the button to generate your Robot Framework project:
            <span className="text-[#3592C4] font-mono">{projectName || 'my-robot-project'}</span>
          </p>
        </div>
        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`flex items-center px-6 py-3 rounded-lg text-white font-medium transition-all duration-200
            ${isGenerating
              ? 'bg-gray-600 cursor-not-allowed'
              : 'bg-[#3592C4] hover:bg-[#2A7999] active:transform active:scale-95'
            }
          `}
        >
          <Download size={18} className="mr-2" />
          {isGenerating ? 'Generating...' : 'Generate Project'}
        </button>
      </div>
    </div>
  );
};

export default GenerateProject;
