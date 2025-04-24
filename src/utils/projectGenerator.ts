import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { Library } from '../data/initializer-data';

interface ProjectConfig {
  projectName: string;
  projectDescription: string;
  pythonVersion: string;
  robotFrameworkVersion: string;
  selectedLibraries: Library[];
  dependencyManager: string;
  libraryParameters: Record<string, Record<string, string>>;
}

export async function generateProject(config: ProjectConfig): Promise<void> {
  const zip = new JSZip();

  // Create project structure
  const rootFolder = zip.folder(config.projectName);
  if (!rootFolder) throw new Error("Failed to create root folder");

  // Create README.md
  rootFolder.file("README.md", generateReadme(config));

  // Create dependency management files based on selected manager
  switch (config.dependencyManager) {
    case 'poetry':
      rootFolder.file("pyproject.toml", generatePoetryConfig(config));
      break;
    case 'pdm':
      rootFolder.file("pyproject.toml", generatePdmConfig(config));
      break;
    case 'uv':
      rootFolder.file("requirements.txt", generateRequirements(config));
      break;
    default: // venv
      rootFolder.file("requirements.txt", generateRequirements(config));
  }

  // Create robot test directory structure
  const testsFolder = rootFolder.folder("tests");
  if (!testsFolder) throw new Error("Failed to create tests folder");

  // Create a sample test file
  testsFolder.file("example_test.robot", generateSampleTest(config));

  // Create resources folder
  const resourcesFolder = rootFolder.folder("resources");
  if (!resourcesFolder) throw new Error("Failed to create resources folder");

  // Create a sample resource file
  resourcesFolder.file("common.resource", generateSampleResource(config));

  // Create results folder (empty)
  rootFolder.folder("results");

  // Create .gitignore
  rootFolder.file(".gitignore", generateGitignore());

  // Generate ZIP file and trigger download
  const content = await zip.generateAsync({ type: "blob" });
  saveAs(content, `${config.projectName}.zip`);
}

function generateReadme(config: ProjectConfig): string {
  const installInstructions = {
    venv: `1. Create a virtual environment:
   \`\`\`
   python -m venv venv
   \`\`\`

2. Activate the virtual environment:
   - Windows: \`venv\\Scripts\\activate\`
   - Unix/MacOS: \`source venv/bin/activate\`

3. Install dependencies:
   \`\`\`
   pip install -r requirements.txt
   \`\`\``,
    uv: `1. Install uv:
   \`\`\`
   curl -LsSf https://astral.sh/uv/install.sh | sh
   \`\`\`

2. Create virtual environment and install dependencies:
   \`\`\`
   uv venv
   uv pip install -r requirements.txt
   \`\`\``,
    poetry: `1. Install Poetry:
   \`\`\`
   curl -sSL https://install.python-poetry.org | python3 -
   \`\`\`

2. Install dependencies:
   \`\`\`
   poetry install
   \`\`\``,
    pdm: `1. Install PDM:
   \`\`\`
   curl -sSL https://pdm.fming.dev/install-pdm.py | python3 -
   \`\`\`

2. Install dependencies:
   \`\`\`
   pdm install
   \`\`\``,
  };

  return `# ${config.projectName}

${config.projectDescription || 'A Robot Framework project.'}

## Project Setup

This project was generated using Robot Framework Initializer.

### Requirements

- Python ${config.pythonVersion}
- Robot Framework ${config.robotFrameworkVersion}

### Dependencies

${config.selectedLibraries.map(lib => `- ${lib.name}`).join('\n')}

## Getting Started

${installInstructions[config.dependencyManager as keyof typeof installInstructions]}

## Running Tests

\`\`\`
robot -d results tests/
\`\`\`

## Project Structure

- \`tests/\`: Contains test suite files
- \`resources/\`: Contains resource files and keywords
- \`results/\`: Test execution results
`;
}

function generateRequirements(config: ProjectConfig): string {
  let requirements = `robotframework==${config.robotFrameworkVersion}\n`;

  // Add libraries that need to be installed (non-built-in)
  for (const lib of config.selectedLibraries) {
    if (lib.origin !== 'builtIn') {
      // If it has versions, use the latest one
      if (lib.versions && lib.versions.length > 0) {
        const latestVersion = lib.versions[lib.versions.length - 1];
        requirements += `${lib.id}==${latestVersion}\n`;
      } else {
        requirements += `${lib.id}\n`;
      }

      // Add OS-specific dependencies
      for (const dep of lib.dependencies) {
        if (dep.os !== 'all') {
          if (dep.version) {
            requirements += `${dep.name}==${dep.version} ; platform_system=="${dep.os}"\n`;
          } else {
            requirements += `${dep.name} ; platform_system=="${dep.os}"\n`;
          }
        } else {
          if (dep.version) {
            requirements += `${dep.name}==${dep.version}\n`;
          } else {
            requirements += `${dep.name}\n`;
          }
        }
      }
    }
  }

  return requirements;
}

function generatePoetryConfig(config: ProjectConfig): string {
  const dependencies = config.selectedLibraries
    .filter(lib => lib.origin !== 'builtIn')
    .map(lib => {
      const version = lib.versions.length > 0 ? lib.versions[lib.versions.length - 1] : '*';
      return `${lib.id} = "^${version}"`;
    })
    .join('\n');

  return `[tool.poetry]
name = "${config.projectName}"
version = "0.1.0"
description = "${config.projectDescription}"
authors = ["Your Name <your.email@example.com>"]

[tool.poetry.dependencies]
python = "^${config.pythonVersion}"
robotframework = "^${config.robotFrameworkVersion}"
${dependencies}

[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"`;
}

function generatePdmConfig(config: ProjectConfig): string {
  const dependencies = config.selectedLibraries
    .filter(lib => lib.origin !== 'builtIn')
    .map(lib => {
      const version = lib.versions.length > 0 ? lib.versions[lib.versions.length - 1] : '*';
      return `${lib.id} = "^${version}"`;
    })
    .join('\n');

  return `[project]
name = "${config.projectName}"
version = "0.1.0"
description = "${config.projectDescription}"
authors = [
    {name = "Your Name", email = "your.email@example.com"},
]
dependencies = [
    "robotframework==${config.robotFrameworkVersion}",
    ${dependencies}
]
requires-python = ">=${config.pythonVersion}"

[build-system]
requires = ["pdm-backend"]
build-backend = "pdm.backend"`;
}

function generateSampleTest(config: ProjectConfig): string {
  // Generate import statements based on selected libraries
  const libraryImports = config.selectedLibraries
    .map(lib => {
      const params = config.libraryParameters[lib.id];
      if (params) {
        const paramString = Object.entries(params)
          .map(([key, value]) => `${key}=${value}`)
          .join('    ');
        return `Library    ${lib.name}    ${paramString}`;
      }
      return `Library    ${lib.name}`;
    })
    .join('\n');

  return `*** Settings ***
Documentation    Example test suite
Resource    ../resources/common.resource
${libraryImports}

*** Variables ***
${config.selectedLibraries.some(lib => lib.name === 'SeleniumLibrary' || lib.name === 'Browser') ?
  '${URL}    https://robotframework.org' :
  '${EXAMPLE_VAR}    example value'}

*** Test Cases ***
Example Test
    [Documentation]    Example test case
    [Tags]    example
    Log    Running example test
    ${config.selectedLibraries.some(lib => lib.name === 'SeleniumLibrary') ?
      'Open Browser    ${URL}    chrome\n    Title Should Be    Robot Framework' :
      config.selectedLibraries.some(lib => lib.name === 'Browser') ?
      'New Browser    chromium    headless=False\n    New Page    ${URL}\n    Get Title    ==    Robot Framework' :
      'Common Keyword\n    Should Be Equal    1    1'}
`;
}

function generateSampleResource(config: ProjectConfig): string {
  return `*** Settings ***
Documentation    Common keywords and variables

*** Variables ***
${config.selectedLibraries.some(lib => lib.name === 'SeleniumLibrary' || lib.name === 'Browser') ?
  '${TIMEOUT}    20s' :
  '${COMMON_VAR}    common value'}

*** Keywords ***
Common Keyword
    [Documentation]    Example of a common keyword
    Log    This is a common keyword
`;
}

function generateGitignore(): string {
  return `# Python
__pycache__/
*.py[cod]
*$py.class
*.so
.Python
env/
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
*.egg-info/
.installed.cfg
*.egg
venv/
.venv/

# Dependency management
.pdm.toml
pdm.lock
poetry.lock
.uv/

# Robot Framework
log.html
output.xml
report.html
results/
selenium-screenshot-*.png

# IDE files
.idea/
.vscode/
*.swp
*.swo
`;
}
