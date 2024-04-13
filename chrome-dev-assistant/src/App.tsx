import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const handleSubmit = async () => {
    const [tab] = await chrome.tabs.query({ active: true });
    chrome.scripting.executeScript({
      target: { tabId: tab.id! },
      func: (inputText) => {
        console.log("Antes de editor");

        const buttonPrompt = document.querySelector(
          ".send-button"
        ) as HTMLButtonElement;
        const editor = document.querySelector(".ql-editor p");

        if (!editor) {
          console.error("El editor no fue encontrado");
          return;
        }

        console.log(editor);
        editor.innerHTML = inputText;

        const attemptClick = (attempts = 0) => {
          console.log(
            "Estado del botón:",
            `Disabled: ${buttonPrompt.disabled}`,
            `Aria-Disabled: ${buttonPrompt.getAttribute("aria-disabled")}`,
            `Display: ${getComputedStyle(buttonPrompt).display}`
          );

          if (
            buttonPrompt &&
            buttonPrompt.getAttribute("aria-disabled") !== "true" &&
            !buttonPrompt.disabled &&
            getComputedStyle(buttonPrompt).display !== "none"
          ) {
            buttonPrompt.click();
            console.log("Botón clickeado");
          } else if (attempts < 10) {
            setTimeout(() => attemptClick(attempts + 1), 1000);
          } else {
            console.error(
              "El botón sigue desactivado o oculto después de varios intentos"
            );
          }
        };

        attemptClick();
      },
      args: [prompt],
    });
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type="text" value={prompt} onChange={handlePromptChange} />
        <button onClick={handleSubmit}>Enviar Prompt</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
