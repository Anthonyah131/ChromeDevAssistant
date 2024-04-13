chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "openTabAndExecute") {
    const prompt = req.promptText;
    console.log("Prompt recibido:", prompt);
    chrome.tabs.create(
      { url: "https://gemini.google.com/app?hl=es_419", active: true },
      (newTab) => {
        setTimeout(() => {
          chrome.scripting.executeScript({
            target: { tabId: newTab.id },
            func: (inputText) => {
              console.log("Antes de editor");

              const buttonPrompt = document.querySelector(
                ".send-button"
              );
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
                  `Aria-Disabled: ${buttonPrompt.getAttribute(
                    "aria-disabled"
                  )}`,
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
        }, 5000);
      }
    );
  }
});
