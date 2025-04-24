import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DependencyManager from './components/DependencyManager';
import Footer from './components/Footer';
import GenerateProject from './components/GenerateProject';
import Header from './components/Header';
import LanguageSelector from './components/LanguageSelector';
import LibrarySelector from './components/LibrarySelector';
import ProjectMetadata from './components/ProjectMetadata';
import ProjectSummary from './components/ProjectSummary';
import VersionSelector from './components/VersionSelector';
import { initializerData } from './data/initializer-data';
import './i18n';
import { generateProject } from './utils/projectGenerator';

function App() {
  const { t } = useTranslation();

  // Project metadata state
  const [projectName, setProjectName] = useState('my-robot-project');
  const [projectDescription, setProjectDescription] = useState('A Robot Framework project for test automation');

  // Version selection state
  const [selectedPythonVersion, setSelectedPythonVersion] = useState(initializerData.defaultPythonVersion);
  const [selectedRobotVersion, setSelectedRobotVersion] = useState(initializerData.defaultRobotFrameworkVersion);

  // Library selection state
  const [selectedLibraryIds, setSelectedLibraryIds] = useState<string[]>([
    'robotframework-string',
    'robotframework-collections',
    'robotframework-datetime'
  ]);

  // Library versions state
  const [libraryVersions, setLibraryVersions] = useState<Record<string, string>>({});

  // Dependency manager state
  const [selectedManager, setSelectedManager] = useState('uv');

  // Library parameters state
  const [libraryParameters, setLibraryParameters] = useState<Record<string, Record<string, string>>>({});

  // Project generation state
  const [isGenerating, setIsGenerating] = useState(false);

  // Get selected libraries as full objects
  const selectedLibraries = useMemo(() => {
    return initializerData.libraries.filter(lib => selectedLibraryIds.includes(lib.id));
  }, [selectedLibraryIds]);

  // Initialize library versions with latest versions
  useEffect(() => {
    const initialVersions: Record<string, string> = {};
    initializerData.libraries.forEach(lib => {
      if (lib.versions.length > 0) {
        initialVersions[lib.id] = lib.versions[lib.versions.length - 1];
      }
    });
    setLibraryVersions(initialVersions);
  }, []);

  // Initialize library parameters with default values
  useEffect(() => {
    const initialParameters: Record<string, Record<string, string>> = {};
    initializerData.libraries.forEach(lib => {
      if (lib.parameters.length > 0) {
        initialParameters[lib.id] = {};
        lib.parameters.forEach(param => {
          initialParameters[lib.id][param.name] = param.defaultValue;
        });
      }
    });
    setLibraryParameters(initialParameters);
  }, []);

  // Handle library selection toggle
  const handleLibraryToggle = (libraryId: string) => {
    const library = initializerData.libraries.find(lib => lib.id === libraryId);
    if (!library) return;

    // Check if the library is incompatible with any selected libraries
    const hasIncompatibilities = selectedLibraries.some(selectedLib =>
      selectedLib.incompatibleLibraries.includes(libraryId) ||
      library.incompatibleLibraries.includes(selectedLib.id)
    );

    if (hasIncompatibilities) {
      alert(t('dependencies.incompatibleError'));
      return;
    }

    // Check for conflicts
    const hasConflicts = selectedLibraries.some(selectedLib =>
      selectedLib.conflictingLibraries.includes(libraryId) ||
      library.conflictingLibraries.includes(selectedLib.id)
    );

    if (hasConflicts) {
      const proceed = window.confirm(t('dependencies.conflictWarning'));
      if (!proceed) return;
    }

    setSelectedLibraryIds(prev => {
      if (prev.includes(libraryId)) {
        return prev.filter(id => id !== libraryId);
      } else {
        return [...prev, libraryId];
      }
    });
  };

  // Handle library version change
  const handleVersionChange = (libraryId: string, version: string) => {
    setLibraryVersions(prev => ({
      ...prev,
      [libraryId]: version
    }));
  };

  // Handle library parameter change
  const handleParameterChange = (libraryId: string, paramName: string, value: string) => {
    setLibraryParameters(prev => ({
      ...prev,
      [libraryId]: {
        ...prev[libraryId],
        [paramName]: value
      }
    }));
  };

  // Handle project generation
  const handleGenerateProject = async () => {
    setIsGenerating(true);

    try {
      await generateProject({
        projectName,
        projectDescription,
        pythonVersion: selectedPythonVersion,
        robotFrameworkVersion: selectedRobotVersion,
        selectedLibraries,
        dependencyManager: selectedManager,
        libraryParameters
      });
    } catch (error) {
      console.error('Error generating project:', error);
      alert('An error occurred while generating the project. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2B2B2B] text-gray-200">
      <Header>
        <LanguageSelector />
      </Header>

      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">{t('header.title')}</h1>
            <p className="text-gray-400">{t('main.description')}</p>
          </div>

          <ProjectMetadata
            projectName={projectName}
            setProjectName={setProjectName}
            projectDescription={projectDescription}
            setProjectDescription={setProjectDescription}
          />

          <VersionSelector
            pythonVersions={initializerData.pythonVersions}
            robotFrameworkVersions={initializerData.robotFrameworkVersions}
            selectedPythonVersion={selectedPythonVersion}
            selectedRobotVersion={selectedRobotVersion}
            onPythonVersionChange={setSelectedPythonVersion}
            onRobotVersionChange={setSelectedRobotVersion}
          />

          <DependencyManager
            selectedManager={selectedManager}
            onManagerChange={setSelectedManager}
          />

          <LibrarySelector
            libraries={initializerData.libraries}
            selectedLibraries={selectedLibraryIds}
            onLibraryToggle={handleLibraryToggle}
            libraryVersions={libraryVersions}
            onVersionChange={handleVersionChange}
            libraryParameters={libraryParameters}
            onParameterChange={handleParameterChange}
            // onConfigureParameters={handleParameterChange}
          />

          <ProjectSummary
            projectName={projectName}
            pythonVersion={selectedPythonVersion}
            robotVersion={selectedRobotVersion}
            selectedLibraries={selectedLibraries}
          />

          <GenerateProject
            onGenerate={handleGenerateProject}
            projectName={projectName}
            isGenerating={isGenerating}
          />
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
