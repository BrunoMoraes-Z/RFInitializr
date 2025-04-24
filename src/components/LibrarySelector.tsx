import { Plus } from 'lucide-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Library } from '../data/initializer-data';
import LibraryModal from './LibraryModal';

interface LibrarySelectorProps {
  libraries: Library[];
  selectedLibraries: string[];
  onLibraryToggle: (libraryId: string) => void;
  libraryVersions: Record<string, string>;
  onVersionChange: (libraryId: string, version: string) => void;
  libraryParameters: Record<string, Record<string, string>>;
  onParameterChange: (libraryId: string, paramName: string, value: string) => void;
}

const LibrarySelector: React.FC<LibrarySelectorProps> = ({
  libraries,
  selectedLibraries,
  onLibraryToggle,
  libraryVersions,
  onVersionChange,
  libraryParameters,
  onParameterChange
}) => {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedLibraryObjects = libraries.filter(lib => selectedLibraries.includes(lib.id));

  return (
    <div className="bg-[#3C3F41] rounded-lg p-6 mb-6 shadow-lg">
      <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
        <h2 className="text-lg font-semibold text-white">
          {t('dependencies.title')}
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-[#3592C4] text-white rounded hover:bg-[#2A7999] transition-colors"
        >
          <Plus size={18} className="mr-2" />
          Add Library
        </button>
      </div>

      {selectedLibraryObjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedLibraryObjects.map(library => (
            <div
              key={library.id}
              className="bg-[#2B2B2B] rounded-lg p-4 border border-gray-700"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-white font-medium">{library.name}</h3>
                    {library.origin === 'builtIn' && (
                      <span className="inline-flex px-2 py-0.5 text-xs rounded-full bg-[#3D4A5C] text-[#A5C0E4] whitespace-nowrap">
                        {t('dependencies.builtIn')}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{library.description}</p>
                </div>
              </div>

              {library.versions?.length > 0 && (
                <div className="mb-3">
                  <label className="block text-xs font-medium text-gray-300 mb-1">
                    {t('dependencies.selectVersion')}
                  </label>
                  <select
                    value={libraryVersions[library.id] || library.versions[library.versions.length - 1]}
                    onChange={(e) => onVersionChange(library.id, e.target.value)}
                    className="w-full px-2 py-1.5 text-sm bg-[#3C3F41] border border-gray-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-[#3592C4]"
                  >
                    {library.versions.map(version => (
                      <option key={version} value={version}>{version}</option>
                    ))}
                  </select>
                </div>
              )}

              {library.parameters?.length > 0 && (
                <div className="space-y-3 mb-3">
                  {library.parameters.map(param => (
                    <div key={param.name}>
                      <label className="block text-xs font-medium text-gray-300 mb-1">
                        {param.name}
                        <span className="text-xs text-gray-400 ml-2">{param.description}</span>
                      </label>
                      {param.type === 'boolean' ? (
                        <select
                          value={libraryParameters[library.id]?.[param.name] !== undefined
                            ? libraryParameters[library.id][param.name]
                            : param.defaultValue}
                          onChange={(e) => onParameterChange(library.id, param.name, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm bg-[#3C3F41] border border-gray-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-[#3592C4]"
                        >
                          {param.values?.map(value => (
                            <option key={value} value={value}>{value}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={libraryParameters[library.id]?.[param.name] !== undefined
                            ? libraryParameters[library.id][param.name]
                            : param.defaultValue}
                          onChange={(e) => onParameterChange(library.id, param.name, e.target.value)}
                          className="w-full px-2 py-1.5 text-sm bg-[#3C3F41] border border-gray-700 rounded text-white focus:outline-none focus:ring-1 focus:ring-[#3592C4]"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end">
                <button
                  onClick={() => onLibraryToggle(library.id)}
                  className="px-3 py-1.5 text-sm bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-gray-400">
          No libraries selected. Click "Add Library" to get started.
        </div>
      )}

      <LibraryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        libraries={libraries}
        selectedLibraries={selectedLibraries}
        onLibraryToggle={onLibraryToggle}
        libraryVersions={libraryVersions}
        onVersionChange={onVersionChange}
        libraryParameters={libraryParameters}
        onParameterChange={onParameterChange}
      />
    </div>
  );
};

export default LibrarySelector;
