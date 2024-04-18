chrome.runtime.onMessage.addListener((req, sender, sendResponse) => {
  if (req.action === "openTabAndExecute") {
    handleAIRequest(req.ai, req.promptText);
  }
});

function handleAIRequest(ai, prompt) {
  const config = {
    Gemini: {
      url: "https://gemini.google.com/app",
      pattern: "*://gemini.google.com/app*",
    },
    "Chat GPT": {
      url: "https://chat.openai.com/chat",
      pattern: "*://chat.openai.com/*",
    },
  };

  const aiConfig = config[ai];
  if (!aiConfig) return;

  findOrCreateTab(ai, aiConfig.url, aiConfig.pattern, prompt);
}

function findOrCreateTab(ai, url, pattern, prompt) {
  chrome.tabs.query({ url: pattern }, (tabs) => {
    if (tabs.length > 0) {
      const tab = tabs[0];
      chrome.tabs.update(tab.id, { active: true }, (updatedTab) => {
        setTimeout(() => executeScriptInTab(ai, updatedTab.id, prompt), 2000);
      });
    } else {
      chrome.tabs.create({ url: url, active: true }, (newTab) => {
        setTimeout(() => executeScriptInTab(ai, newTab.id, prompt), 5000);
      });
    }
  });
}

function executeScriptInTab(ai, tabId, prompt) {
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: injectedFunction,
    args: [prompt, ai],
  });
}

function injectedFunction(prompt, ai) {
  if (ai === "Gemini") {
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
        console.error(
          "El botón sigue desactivado o oculto después de varios intentos"
        );
      }
    };
    attemptClick();
  } else if (ai === "Chat GPT") {
    const input = document.getElementById("prompt-textarea");

    if (!input) {
      console.error("El input no fue encontrado");
      return;
    }

    input.value = prompt;

    const eventInput = new Event("input", { bubbles: true });
    input.dispatchEvent(eventInput);

    const eventChange = new Event("change", { bubbles: true });
    input.dispatchEvent(eventChange);

    input.focus();
    const eventEnter = new KeyboardEvent("keydown", {
      key: "Enter",
      code: "Enter",
      keyCode: 13,
      which: 13,
      bubbles: true,
      cancelable: true,
    });

    input.dispatchEvent(eventEnter);
  }
}
