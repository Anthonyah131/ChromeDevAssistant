import { useState, useEffect } from "react";
import "./index.css";

function App() {
  const [error, setError] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [technology, setTechnology] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    setOutput(`${error} Workflow: ${workflow}, Tech: ${technology}`);
  }, [error, workflow, technology]);

  const handleSubmit = () => {
    chrome.runtime.sendMessage({
      action: "openTabAndExecute",
      promptText: output,
    });
  };

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
        <p>Select the technology from where the error originated:</p>
        <select
          className="w-full p-2 border border-gray-300 bg-gray-700 text-white rounded"
          value={technology}
          onChange={(e) => setTechnology(e.target.value)}
        >
          <option value="">Select Technology</option>
          {["Java", "C++", "React", "JS", "Python", "MySQL", "Remix"].map(
            (tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            )
          )}
        </select>
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
