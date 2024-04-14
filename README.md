# ChromeDevAssistant README 📄

## Introduction 🌟
ChromeDevAssistant is a Google Chrome extension designed to aid developers by automating the process of debugging and error resolution through interactive prompts. Leveraging Vite, React, TypeScript, and Tailwind CSS, this extension allows users to paste or type an error message, choose a workflow—either Tool Use or Reflection—and if desired, specify the technology the error pertains to (e.g., React, Java, C++). The extension then processes the input, automatically opens a new Gemini tab, inputs the prompt, and submits it, streamlining the debugging process.

## Installation 🔧
To install ChromeDevAssistant, follow these steps:
1. Clone the repository to your local machine:
    ```bash
    git clone https://github.com/Anthonyah131/ChromeDevAssistant.git
    ```
2. Navigate to the directory:
    ```bash
    cd chrome-dev-assistant
    ```
3. Install the dependencies:
    ```bash
    npm install
    ```
4. Build the project:
    ```bash
    npm run build
    ```
5. Load the extension into Google Chrome:
    - Open Chrome and go to `chrome://extensions/`
    - Enable Developer mode and click on "Load unpacked".
    - Select the `dist` folder from the cloned repository.

## Usage 🛠️
To use ChromeDevAssistant:
1. Click on the extension icon in Chrome.
2. In the popup, paste or type the error you are encountering.
3. Select the desired workflow (Tool Use or Reflection) and specify the technology if applicable.
4. Click 'Send Prompt'.
5. The extension will handle the rest, opening a Gemini tab and inputting and submitting your prompt automatically.

## Features 🌈
- **Error Input**: Users can paste or type errors directly into the extension.
- **Workflow Selection**: Choose between Tool Use and Reflection workflows.
- **Technology Specific Debugging**: Option to specify the technology related to the error.
- **Automation**: Fully automated interaction with Gemini to input and submit prompts.
- **User-Friendly Interface**: Designed with Tailwind CSS for a clean and intuitive user experience.

## Dependencies 📦
- **Vite**: Used as the build tool and development environment.
- **React**: For building the user interface.
- **TypeScript**: Adds type safety to JavaScript code.
- **Tailwind CSS**: For styling and responsive design.

## Contributors 👥
- **Anthony Avila Hernández** [- GitHub](https://github.com/Anthonyah131)
