import { Dialog } from '@headlessui/react';
import { AlertCircle, AlertTriangle, Check, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Library } from '../data/initializer-data';

interface LibraryModalProps {
  isOpen: boolean;
  onClose: () => void;
  libraries: Library[];
  selectedLibraries: string[];
  onLibraryToggle: (libraryId: string) => void;
  libraryVersions: Record<string, string>;
  onVersionChange: (libraryId: string, version: string) => void;
  libraryParameters: Record<string, Record<string, string>>;
  onParameterChange: (libraryId: string, paramName: string, value: string) => void;
}

const LibraryModal: React.FC<LibraryModalProps> = ({
  isOpen,
  onClose,
  libraries,
  selectedLibraries,
  onLibraryToggle,
  libraryVersions,
  onVersionChange,
  libraryParameters,
  onParameterChange
}) => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedLibrary, setSelectedLibrary] = useState<Library | null>(null);

  // Extract all unique tags from libraries
  const tags = useMemo(() => {
    const allTags = libraries.flatMap(lib => lib.tags);
    return Array.from(new Set(allTags)).sort();
  }, [libraries]);

  // Filter libraries based on search term and selected tag
  const filteredLibraries = useMemo(() => {
    return libraries.filter(library => {
      const matchesSearch = searchTerm === '' ||
        library.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        library.description.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesTag = selectedTag === null || library.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [libraries, searchTerm, selectedTag]);

  // Check for conflicts with currently selected libraries
  const hasConflict = (library: Library): boolean => {
    if (!selectedLibraries.includes(library.id)) {
      for (const selectedId of selectedLibraries) {
        const selectedLib = libraries.find(lib => lib.id === selectedId);
        if (selectedLib) {
          if (
            selectedLib.conflictingLibraries.includes(library.id) ||
            library.conflictingLibraries.includes(selectedLib.id)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  // Check for conflicts with currently selected libraries
  const hasIncompatibility = (library: Library): boolean => {
    if (!selectedLibraries.includes(library.id)) {
      for (const selectedId of selectedLibraries) {
        const selectedLib = libraries.find(lib => lib.id === selectedId);
        if (selectedLib) {
          if (
            selectedLib.incompatibleLibraries.includes(library.id) ||
            library.incompatibleLibraries.includes(selectedLib.id)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-6xl h-[80vh] rounded-lg bg-[#2B2B2B] shadow-xl flex flex-col">
          <div className="flex justify-between items-center p-6 border-b border-gray-700">
            <Dialog.Title className="text-xl font-medium text-white">
              {t('dependencies.title')}
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Left side - Library list */}
            <div className="w-1/2 border-r border-gray-700 p-6 flex flex-col">
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('dependencies.search')}
                  </label>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 bg-[#3C3F41] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
                    placeholder={t('dependencies.searchPlaceholder')}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    {t('dependencies.filterByTag')}
                  </label>
                  <select
                    value={selectedTag || ''}
                    onChange={(e) => setSelectedTag(e.target.value === '' ? null : e.target.value)}
                    className="w-full px-3 py-2 bg-[#3C3F41] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
                  >
                    <option value="">{t('dependencies.allTags')}</option>
                    {tags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="space-y-2">
                  {filteredLibraries.map(library => (
                    <div
                      key={library.id}
                      onClick={() => setSelectedLibrary(library)}
                      className={`p-3 rounded-lg cursor-pointer transition-colors relative
                        ${selectedLibrary?.id === library.id ? 'bg-[#3D4A5C] border-[#3592C4]' : 'bg-[#3C3F41] hover:bg-[#454950]'}
                        ${hasIncompatibility(library) ? 'opacity-50' : 'opacity-100'}`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center">
                            <h3 className="text-white font-medium">{library.name}</h3>
                            {selectedLibraries.includes(library.id) && (
                              <Check size={16} className="text-green-500 ml-2" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400 line-clamp-1">{library.description}</p>
                        </div>
                        {hasConflict(library) && (
                          <AlertTriangle size={16} className="text-amber-400 ml-2 flex-shrink-0" />
                        )}
                        {hasIncompatibility(library) && (
                          <AlertCircle size={16} className="text-red-400 ml-2 flex-shrink-0" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Library details */}
            <div className="w-1/2 p-6 overflow-y-auto">
              {selectedLibrary ? (
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-medium text-white">{selectedLibrary.name}</h2>
                      {selectedLibrary.origin === 'builtIn' && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-[#3D4A5C] text-[#A5C0E4]">
                          {t('dependencies.builtIn')}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-gray-400">{selectedLibrary.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {selectedLibrary.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs rounded-full bg-[#324353] text-[#A5C0E4]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {selectedLibrary.versions.length > 0 && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        {t('dependencies.selectVersion')}
                      </label>
                      <select
                        value={libraryVersions[selectedLibrary.id] || selectedLibrary.versions[selectedLibrary.versions.length - 1]}
                        onChange={(e) => onVersionChange(selectedLibrary.id, e.target.value)}
                        className="w-full px-3 py-2 bg-[#3C3F41] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
                      >
                        {selectedLibrary.versions.map(version => (
                          <option key={version} value={version}>{version}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* && selectedLibraries.includes(selectedLibrary.id) */}
                  {selectedLibrary.parameters.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-white">Parameters</h3>
                      {selectedLibrary.parameters.map(param => (
                        <div key={param.name}>
                          <label className="block text-sm text-gray-300 mb-1">
                            {param.name}
                            <span className="text-xs text-gray-400 ml-2">{param.description}</span>
                          </label>
                          {param.type === 'boolean' ? (
                            <select
                              value={libraryParameters[selectedLibrary.id]?.[param.name] ?? param.defaultValue}
                              onChange={(e) => onParameterChange(selectedLibrary.id, param.name, e.target.value)}
                              className="w-full px-3 py-2 bg-[#3C3F41] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
                            >
                              {param.values?.map(value => (
                                <option key={value} value={value}>{value}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type="text"
                              value={libraryParameters[selectedLibrary.id]?.[param.name] ?? param.defaultValue}
                              onChange={(e) => onParameterChange(selectedLibrary.id, param.name, e.target.value)}
                              className="w-full px-3 py-2 bg-[#3C3F41] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedLibrary.dependencies.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-white mb-2">{t('dependencies.dependencies')}:</h3>
                      <ul className="space-y-1">
                        {selectedLibrary.dependencies.map(dep => (
                          <li key={dep.name} className="text-sm text-gray-400">
                            • {dep.name} {dep.version && `(${dep.version})`}
                            {dep.os !== 'all' && ` - ${dep.os}`}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(selectedLibrary.conflictingLibraries.length > 0 || selectedLibrary.incompatibleLibraries.length > 0) && (
                    <div className="space-y-4">
                      {selectedLibrary.conflictingLibraries.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-white mb-2">{t('dependencies.conflictsWith')}:</h3>
                          <ul className="space-y-1">
                            {selectedLibrary.conflictingLibraries.map(lib => (
                              <li key={lib} className="text-sm text-gray-400">• {lib}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {selectedLibrary.incompatibleLibraries.length > 0 && (
                        <div>
                          <h3 className="text-sm font-medium text-white mb-2">{t('dependencies.incompatibleWith')}:</h3>
                          <ul className="space-y-1">
                            {selectedLibrary.incompatibleLibraries.map(lib => (
                              <li key={lib} className="text-sm text-gray-400">• {lib}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-700">
                    <button
                      onClick={() => onLibraryToggle(selectedLibrary.id)}
                      disabled={selectedLibrary.incompatibleLibraries.some(lib =>
                        selectedLibraries.includes(lib)
                      )}
                      className={`w-full px-4 py-2 rounded text-white font-medium transition-colors
                        ${selectedLibraries.includes(selectedLibrary.id)
                          ? 'bg-red-600 hover:bg-red-700'
                          : 'bg-[#3592C4] hover:bg-[#2A7999]'}
                        disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                      {selectedLibraries.includes(selectedLibrary.id)
                        ? 'Remove Library'
                        : 'Add Library'}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <p>Select a library to view details</p>
                </div>
              )}
            </div>
          </div>

          <div className="p-6 border-t border-gray-700 flex justify-end">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-[#3592C4] text-white rounded hover:bg-[#2A7999] transition-colors"
            >
              Done
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LibraryModal;
