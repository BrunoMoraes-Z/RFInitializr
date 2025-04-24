import React from 'react';
import { PythonVersion, RobotFrameworkVersion } from '../data/initializer-data';

interface VersionSelectorProps {
  pythonVersions: PythonVersion[];
  robotFrameworkVersions: RobotFrameworkVersion[];
  selectedPythonVersion: string;
  selectedRobotVersion: string;
  onPythonVersionChange: (version: string) => void;
  onRobotVersionChange: (version: string) => void;
}

const VersionSelector: React.FC<VersionSelectorProps> = ({
  pythonVersions,
  robotFrameworkVersions,
  selectedPythonVersion,
  selectedRobotVersion,
  onPythonVersionChange,
  onRobotVersionChange
}) => {
  return (
    <div className="bg-[#3C3F41] rounded-lg p-6 mb-6 shadow-lg">
      <h2 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">Project Settings</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="python-version" className="block text-sm font-medium text-gray-300 mb-2">
            Python Version
          </label>
          <div className="relative">
            <select
              id="python-version"
              value={selectedPythonVersion}
              onChange={(e) => onPythonVersionChange(e.target.value)}
              className="block w-full px-3 py-2 bg-[#2B2B2B] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
            >
              {pythonVersions.map((version) => (
                <option key={version.name} value={version.name}>
                  Python {version.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="robot-version" className="block text-sm font-medium text-gray-300 mb-2">
            Robot Framework Version
          </label>
          <div className="relative">
            <select
              id="robot-version"
              value={selectedRobotVersion}
              onChange={(e) => onRobotVersionChange(e.target.value)}
              className="block w-full px-3 py-2 bg-[#2B2B2B] border border-gray-700 rounded-md text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
            >
              {robotFrameworkVersions.map((version) => (
                <option key={version.name} value={version.name}>
                  {version.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
              <svg className="h-4 w-4 fill-current" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VersionSelector;
