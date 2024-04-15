chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "openTabAndExecute") {
    const prompt = req.promptText;
    findOrCreateTab("https://gemini.google.com/app", prompt);
  }
});

function findOrCreateTab(url, prompt) {
  chrome.tabs.query({url: "*://gemini.google.com/app*"}, (tabs) => {
    if (tabs.length > 0) {
      const tab = tabs[0];
      chrome.tabs.update(tab.id, { active: true }, (updatedTab) => {
        setTimeout(() => executeScriptInTab(updatedTab.id, prompt), 2000);
      });
    } else {
      chrome.tabs.create({ url: url, active: true }, (newTab) => {
        setTimeout(() => executeScriptInTab(newTab.id, prompt), 5000);
      });
    }
  });
}

function executeScriptInTab(tabId, prompt) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: injectedFunction,
    args: [prompt],
  });
}

function injectedFunction(prompt) {
  const buttonPrompt = document.querySelector(".send-button");
  const editor = document.querySelector(".ql-editor p");

  if (!editor) {
    console.error("El editor no fue encontrado");
    return;
  }

  editor.innerHTML = prompt;

  const attemptClick = (attempts = 0) => {
    if (
      buttonPrompt &&
      buttonPrompt.getAttribute("aria-disabled") !== "true" &&
      !buttonPrompt.disabled &&
      getComputedStyle(buttonPrompt).display !== "none"
    ) {
      buttonPrompt.click();
    } else if (attempts < 10) {
      setTimeout(() => attemptClick(attempts + 1), 1000);
    } else {
      console.error("El botón sigue desactivado o oculto después de varios intentos");
    }
  };
  attemptClick();
}
