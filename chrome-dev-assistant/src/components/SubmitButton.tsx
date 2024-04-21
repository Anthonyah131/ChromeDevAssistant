import React from "react";

export function SubmitButton({
  ai,
  error,
  technology,
  workflow,
  output,
  onSend,
}) {
  const isEnabled = error && technology;

  return (
    <button
      className={`font-semibold px-4 py-2 rounded ${
        isEnabled
          ? "bg-color5 text-color1 hover:bg-color5"
          : "bg-gray-500 cursor-not-allowed"
      }`}
      onClick={() => {
        if (isEnabled) {
          onSend(ai, { error, technology, workflow, output });
        }
      }}
      disabled={!isEnabled}
    >
      Enviar Prompt
    </button>
  );
}
