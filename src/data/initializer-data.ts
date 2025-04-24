// This file contains all the data for the Robot Framework Initializer

export interface PythonVersion {
  name: string;
}

export interface RobotFrameworkVersion {
  name: string;
}

export interface Dependency {
  name: string;
  origin: string;
  os: string;
  version: string;
}

export interface Parameter {
  name: string;
  description: string;
  type: string;
  values: string[];
  defaultValue: string;
}

export interface Library {
  id: string;
  name: string;
  url: string;
  description: string;
  origin: string;
  os: string;
  tags: string[];
  parameters: Parameter[];
  versions: string[];
  conflictingLibraries: string[];
  incompatibleLibraries: string[];
  dependencies: Dependency[];
}

export interface InitializerData {
  defaultPythonVersion: string;
  defaultRobotFrameworkVersion: string;
  standardLibraries: string[];
  pythonVersions: PythonVersion[];
  robotFrameworkVersions: RobotFrameworkVersion[];
  libraries: Library[];
}

export const initializerData: InitializerData = {
  defaultPythonVersion: "3.12",
  defaultRobotFrameworkVersion: "7.2.2",
  standardLibraries: [
    "String",
    "Collections",
    "DateTime",
    "BuiltIn",
    "OperatingSystem",
    "Process"
  ],
  pythonVersions: [
    { name: "3.8" },
    { name: "3.9" },
    { name: "3.10" },
    { name: "3.11" },
    { name: "3.12" },
    { name: "3.13" },
    { name: "3.14" }
  ],
  robotFrameworkVersions: [
    { name: "6.1.1" },
    { name: "7.0" },
    { name: "7.0.1" },
    { name: "7.1" },
    { name: "7.1.1" },
    { name: "7.2" },
    { name: "7.2.1" },
    { name: "7.2.2" }
  ],
  libraries: [
    {
      id: "robotframework-string",
      name: "String",
      url: "",
      description: "Library for manipulating strings and verifying their contents",
      origin: "builtIn",
      os: "all",
      tags: ["string", "builtIn"],
      parameters: [],
      versions: [],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: []
    },
    {
      id: "robotframework-collections",
      name: "Collections",
      url: "",
      description: "Contains keywords for handling lists and dictionaries.",
      origin: "builtIn",
      os: "all",
      tags: ["collections", "list", "map", "builtIn"],
      parameters: [],
      versions: [],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: []
    },
    {
      id: "robotframework-datetime",
      name: "DateTime",
      url: "",
      description: "Supports creating and verifying date and time values as well as calculations between them.",
      origin: "builtIn",
      os: "all",
      tags: ["date", "datetime", "timestamp", "builtIn"],
      parameters: [],
      versions: [],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: []
    },
    {
      id: "robotframework-operatingsystem",
      name: "OperatingSystem",
      url: "",
      description: "Enables performing various operating system related tasks.",
      origin: "builtIn",
      os: "all",
      tags: ["operatingsystem", "builtIn"],
      parameters: [],
      versions: [],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: []
    },
    {
      id: "robotframework-process",
      name: "Process",
      url: "",
      description: "Supports executing processes in the system.",
      origin: "builtIn",
      os: "all",
      tags: ["process", "builtIn"],
      parameters: [],
      versions: [],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: []
    },
    {
      id: "robotframework-xml",
      name: "XML",
      url: "",
      description: "Library for verifying and modifying XML documents.",
      origin: "builtIn",
      os: "all",
      tags: ["xml", "xpath", "builtIn"],
      parameters: [],
      versions: [],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: []
    },
    {
      id: "robotframework-screenshot",
      name: "Screenshot",
      url: "",
      description: "Provides keywords to capture and store screenshots of the desktop.",
      origin: "builtIn",
      os: "all",
      tags: ["xml", "xpath", "builtIn"],
      parameters: [],
      versions: [],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: [
        {
          name: "pillow",
          origin: "pypi",
          os: "windows",
          version: ""
        },
        {
          name: "PyGTK",
          origin: "pypi",
          os: "linux",
          version: ""
        }
      ]
    },
    {
      id: "robotframework-requests",
      name: "Requests",
      url: "",
      description: "Library for testing HTTP-based APIs with Robot Framework.",
      origin: "pypi",
      os: "all",
      tags: ["http", "api"],
      parameters: [],
      versions: [
        "0.8", "0.8.1", "0.8.2", "0.9", "0.9.1", "0.9.2",
        "0.9.3", "0.9.4", "0.9.5", "0.9.6", "0.9.7"
      ],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: []
    },
    {
      id: "robotframework-sshlibrary",
      name: "SSH Library",
      url: "",
      description: "Library for testing SSH and SFTP based applications with Robot Framework.",
      origin: "pypi",
      os: "all",
      tags: ["ssh", "sftp"],
      parameters: [],
      versions: ["3.6.0", "3.7.0", "3.8.0"],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: [
        {
          name: "paramiko",
          origin: "pypi",
          os: "windows",
          version: ""
        },
        {
          name: "asyncssh",
          origin: "pypi",
          os: "linux",
          version: ""
        }
      ]
    },
    {
      id: "robotframework-ftplibrary",
      name: "FTP Library",
      url: "",
      description: "Library for testing FTP and SFTP based applications with Robot Framework.",
      origin: "pypi",
      os: "all",
      tags: ["ftp", "sftp"],
      parameters: [
        {
          name: "printOutput",
          description: "Possible to disable logging of server messages. By default logging is enabled",
          type: "boolean",
          values: ["true", "false", "null"],
          defaultValue: "true"
        }
      ],
      versions: ["1.5", "1.6", "1.8", "1.9"],
      conflictingLibraries: [],
      incompatibleLibraries: [],
      dependencies: [
        {
          name: "ftplib",
          origin: "pypi",
          os: "windows",
          version: ""
        },
        {
          name: "asyncssh",
          origin: "pypi",
          os: "linux",
          version: ""
        }
      ]
    },
    {
      id: "robotframework-seleniumlibrary",
      name: "SeleniumLibrary",
      url: "",
      description: "Library for testing web applications with Robot Framework.",
      origin: "pypi",
      os: "all",
      tags: ["selenium", "web"],
      parameters: [],
      versions: [
        "6.0.0", "6.1", "6.1.0", "6.1.1", "6.1.2", "6.1.3",
        "6.2.0", "6.3.0", "6.4.0", "6.5.0", "6.6.0", "6.6.1",
        "6.7.0", "6.7.1"
      ],
      conflictingLibraries: [
        "robotframework-appiumlibrary",
        "robotframework-sapguilibrary"
      ],
      incompatibleLibraries: [
        "robotframework-browser"
      ],
      dependencies: []
    },
    {
      id: "robotframework-appiumlibrary",
      name: "AppiumLibrary",
      url: "",
      description: "Library for testing mobile applications with Robot Framework.",
      origin: "pypi",
      os: "all",
      tags: ["appium", "mobile", "android", "ios", "web"],
      parameters: [],
      versions: ["1.6", "1.6.1", "1.6.2", "1.6.3", "1.6.4", "2.0.0", "2.1.0"],
      conflictingLibraries: [
        "robotframework-seleniumlibrary",
        "robotframework-browser",
        "robotframework-sapguilibrary"
      ],
      incompatibleLibraries: [],
      dependencies: []
    },
    {
      id: "robotframework-browser",
      name: "Browser",
      url: "",
      description: "Library for testing web applications with Robot Framework.",
      origin: "pypi",
      os: "all",
      tags: ["playwright", "web"],
      parameters: [],
      versions: [
        "18.6.0", "18.6.1", "18.6.2", "18.6.3", "18.7.0", "18.8.0",
        "18.8.1", "18.9.0", "18.9.1", "19.0.0", "19.1.0", "19.1.1",
        "19.1.2", "19.2.0", "19.3.0", "19.3.1", "19.4.0"
      ],
      conflictingLibraries: [
        "robotframework-sapguilibrary",
        "robotframework-appiumlibrary"
      ],
      incompatibleLibraries: [
        "robotframework-seleniumlibrary"
      ],
      dependencies: []
    },
    {
      id: "robotframework-sapguilibrary",
      name: "SAP GUI Library",
      url: "",
      description: "Library for testing SAP GUI applications with Robot Framework.",
      origin: "pypi",
      os: "all",
      tags: ["sap", "gui"],
      parameters: [],
      versions: ["1.0.3", "1.0.5", "1.1"],
      conflictingLibraries: [
        "robotframework-seleniumlibrary",
        "robotframework-appiumlibrary",
        "robotframework-sapguilibrary"
      ],
      incompatibleLibraries: [],
      dependencies: []
    }
  ]
};
