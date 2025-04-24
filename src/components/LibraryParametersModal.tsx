import { Dialog } from '@headlessui/react';
import { X } from 'lucide-react';
import React, { useState } from 'react';
import { Parameter } from '../data/initializer-data';

interface LibraryParametersModalProps {
  isOpen: boolean;
  onClose: () => void;
  libraryName: string;
  parameters: Parameter[];
  onSave: (params: Record<string, string>) => void;
}

const LibraryParametersModal: React.FC<LibraryParametersModalProps> = ({
  isOpen,
  onClose,
  libraryName,
  parameters,
  onSave
}) => {
  const [paramValues, setParamValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    parameters.forEach(param => {
      initial[param.name] = param.defaultValue;
    });
    return initial;
  });

  const handleSave = () => {
    onSave(paramValues);
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
        <Dialog.Panel className="mx-auto max-w-lg rounded-lg bg-[#2B2B2B] p-6 shadow-xl">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-white">
              Configure {libraryName} Parameters
            </Dialog.Title>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="space-y-4">
            {parameters.map(param => (
              <div key={param.name}>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {param.name}
                </label>
                {param.type === 'boolean' ? (
                  <select
                    value={paramValues[param.name]}
                    onChange={(e) => setParamValues(prev => ({
                      ...prev,
                      [param.name]: e.target.value
                    }))}
                    className="w-full px-3 py-2 bg-[#3C3F41] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
                  >
                    {param.values.map(value => (
                      <option key={value} value={value}>{value}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={paramValues[param.name]}
                    onChange={(e) => setParamValues(prev => ({
                      ...prev,
                      [param.name]: e.target.value
                    }))}
                    className="w-full px-3 py-2 bg-[#3C3F41] border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#3592C4]"
                  />
                )}
                <p className="mt-1 text-sm text-gray-400">{param.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md text-gray-300 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-md bg-[#3592C4] text-white hover:bg-[#2A7999] transition-colors"
            >
              Save
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default LibraryParametersModal;
