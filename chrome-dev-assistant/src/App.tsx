import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [error, setError] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [technology, setTechnology] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    if (error.length !== 0 && technology.length !== 0) {
      switch (workflow) {
        case "Reflection":
          setOutput(`Reflexiona sobre el siguiente error que se ha encontrado en tu código de ${technology}: ${error} Analiza las causas posibles de este error. ¿Qué podría estar indicando sobre la estructura del código o los datos que se están manejando en ${technology}? Considera las particularidades de ${technology} que podrían influir en este problema. ¿Cómo podrías ajustar el código para prevenir este tipo de errores en el futuro?`);
          break;
        case "Tool Use":
          setOutput(`Se ha identificado el siguiente error en tu código de ${technology}: ${error} Revisa las herramientas y recursos disponibles que podrían ayudarte a resolver este problema en el contexto de ${technology}. ¿Existe alguna documentación específica, comunidad en línea, o herramientas de depuración particularmente útiles para ${technology} que podrían ofrecerte orientación específica sobre cómo abordar este tipo de error?`);
          break;
        default:
          setOutput("");
      }
    } else {
      setOutput("");
    }
  }, [error, workflow, technology]);

  const handleSubmit = () => {
    chrome.runtime.sendMessage({
      action: "openTabAndExecute",
      promptText: output,
    });
  };

  useEffect(() => {
    setTechnology("JavaScript");
    setWorkflow("Reflection");
  }, []);

  return (
    <div
      className="bg-gray-800 text-white p-5 flex flex-col items-center justify-center"
      style={{ width: "400px", height: "600px" }}
    >
      <img src="icon.png" alt="Logo" className="w-24 h-24 object-cover" />
      <textarea
        className="w-full h-32 p-2 border border-gray-300 bg-gray-700 text-white rounded m-4"
        placeholder="Paste your error here..."
        value={error}
        onChange={(e) => setError(e.target.value)}
      />

      <div>
        <p>Select the workflow you wish to use:</p>
        <label className="inline-flex items-center mr-4">
          <input
            type="radio"
            name="workflow"
            value="Reflection"
            className="text-blue-500"
            onChange={(e) => setWorkflow(e.target.value)}
            checked={workflow === "Reflection"}
          />
          <span className="ml-2">Reflection</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            name="workflow"
            value="Tool Use"
            className="text-blue-500"
            onChange={(e) => setWorkflow(e.target.value)}
          />
          <span className="ml-2">Tool Use</span>
        </label>
      </div>
      <div className="mt-4">
        <p>Enter the technology you are working with:</p>
        <input
          type="text"
          value={technology}
          className="w-full p-2 border border-gray-300 bg-gray-700 text-white rounded m-4"
          onChange={(e) => setTechnology(e.target.value)}
        />
      </div>
      <textarea
        className="w-full h-32 p-2 border border-gray-300 bg-gray-700 text-white rounded mt-4 mb-4"
        placeholder="Output will be displayed here..."
        value={output}
        readOnly
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleSubmit}
      >
        Enviar Prompt
      </button>
    </div>
  );
}

export default App;
