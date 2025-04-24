import { Info } from 'lucide-react';
import React from 'react';

interface DependencyManagerProps {
  selectedManager: string;
  onManagerChange: (manager: string) => void;
}

const managers = [
  {
    id: 'uv',
    name: 'uv',
    description: 'Extremely fast Python package installer and resolver',
    docs: 'https://github.com/astral-sh/uv',
    details: 'Written in Rust, focuses on speed and reliability'
  },
  {
    id: 'venv',
    name: 'venv',
    description: 'Python built-in virtual environment module',
    docs: 'https://docs.python.org/3/library/venv.html',
    details: 'Simple, built into Python, great for basic projects'
  },
  {
    id: 'poetry',
    name: 'Poetry',
    description: 'Python packaging and dependency management made easy',
    docs: 'https://python-poetry.org/',
    details: 'Modern dependency management with lockfile support'
  },
  {
    id: 'pdm',
    name: 'PDM',
    description: 'Modern Python package and dependency manager',
    docs: 'https://pdm.fming.dev/',
    details: 'PEP 582 compatible, supports multiple Python versions'
  }
];

const DependencyManager: React.FC<DependencyManagerProps> = ({
  selectedManager,
  onManagerChange
}) => {
  return (
    <div className="bg-[#3C3F41] rounded-lg p-6 mb-6 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
        Dependency Manager
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {managers.map((manager) => (
          <div
            key={manager.id}
            className={`relative p-4 rounded-lg border cursor-pointer transition-all duration-200
              ${selectedManager === manager.id
                ? 'border-[#3592C4] bg-[#2D3642]'
                : 'border-gray-700 bg-[#2B2B2B] hover:bg-[#2D2F30]'
              }`}
            onClick={() => onManagerChange(manager.id)}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-white font-medium">{manager.name}</h3>
                <p className="text-sm text-gray-400 mt-1">{manager.description}</p>
                <p className="text-xs text-gray-500 mt-2">{manager.details}</p>
                <a
                  href={manager.docs}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-xs text-[#3592C4] hover:text-[#47A3D1] mt-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info size={12} className="mr-1" />
                  Documentation
                </a>
              </div>
              <div
                className={`w-5 h-5 rounded border ${
                  selectedManager === manager.id
                    ? 'bg-[#3592C4] border-[#3592C4]'
                    : 'bg-transparent border-gray-500'
                }`}
              >
                {selectedManager === manager.id && (
                  <div className="flex items-center justify-center h-full">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DependencyManager;
