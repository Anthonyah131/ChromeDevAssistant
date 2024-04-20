import React, { useState, useEffect } from "react";
import { getRecords, createRecord } from "./api/airtableApi";
import "./index.css";
import RadioGroup from "./components/RadioGroup";
import RecordList from "./components/RecordList";
import { AirtableRecord } from "./api/index";

const initialOptions = {
  ai: [
    { value: "Gemini", label: "Gemini" },
    { value: "Chat GPT", label: "Chat GPT" },
  ],
  workflow: [
    { value: "Reflection", label: "Reflection" },
    { value: "Tool Use", label: "Tool Use" },
  ],
};

function App() {
  const [ai, setAI] = useState("Gemini");
  const [error, setError] = useState("");
  const [workflow, setWorkflow] = useState("Reflection");
  const [technology, setTechnology] = useState("JavaScript");
  const [output, setOutput] = useState("");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function initialize() {
      try {
        const data = await getRecords();
        setRecords(data.records);
      } catch (e) {
        console.error("Failed to fetch records:", e);
      }
    }
    initialize();
  }, []);

  useEffect(() => {
    if (error && technology) {
      const newOutput =
        workflow === "Reflection"
          ? `Reflexiona sobre el siguiente error que se ha encontrado en tu código de ${technology}: ${error} Analiza las causas posibles de este error. ¿Qué podría estar indicando sobre la estructura del código o los datos que se están manejando en ${technology}? Considera las particularidades de ${technology} que podrían influir en este problema. ¿Cómo podrías ajustar el código para prevenir este tipo de errores en el futuro?`
          : `Se ha identificado el siguiente error en tu código de ${technology}: ${error} Revisa las herramientas y recursos disponibles que podrían ayudarte a resolver este problema en el contexto de ${technology}. ¿Existe alguna documentación específica, comunidad en línea, o herramientas de depuración particularmente útiles para ${technology} que podrían ofrecerte orientación específica sobre cómo abordar este tipo de error?`;
      setOutput(newOutput);
    } else {
      setOutput("");
    }
  }, [error, technology, workflow]);

  return (
    <div
      className="bg-gray-800 text-white p-5 flex flex-col items-center justify-center overflow-y-auto"
      style={{ width: "400px" }}
    >
      <img src="icon.png" alt="Logo" className="w-24 h-24 object-cover mb-4" />
      <RadioGroup
        title="Select the AI you wish to use:"
        options={initialOptions.ai}
        name="AI"
        selectedValue={ai}
        onChange={setAI}
      />

      <textarea
        className="w-full h-32 p-2 border border-gray-300 bg-gray-700 text-white rounded my-4"
        placeholder="Paste your error here..."
        value={error}
        onChange={(e) => setError(e.target.value)}
      />

      <RadioGroup
        title="Select the workflow you wish to use:"
        options={initialOptions.workflow}
        name="workflow"
        selectedValue={workflow}
        onChange={setWorkflow}
      />

      <div className="w-full mt-4 mb-4">
        <p>Enter the technology you are working with:</p>
        <input
          type="text"
          value={technology}
          className="w-full p-2 border border-gray-300 bg-gray-700 text-white rounded"
          onChange={(e) => setTechnology(e.target.value)}
        />
      </div>

      <textarea
        className="w-full h-32 p-2 border border-gray-300 bg-gray-700 text-white rounded mb-4"
        placeholder="Output will be displayed here..."
        value={output}
        readOnly
      />

      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={() => {
          chrome.runtime
            .sendMessage({
              action: "openTabAndExecute",
              ai: ai,
              promptText: output,
            })
            .then(() => {
              createRecord({
                fields: {
                  ai,
                  error,
                  technology,
                  workflow,
                },
              })
                .then(() => {
                  console.log("Record created successfully");
                })
                .catch((err) => {
                  console.error("Error creating record:", err);
                });
            })
            .catch((err) => {
              console.error("Error sending message:", err);
            });
        }}
      >
        Enviar Prompt
      </button>

      <RecordList
        records={records}
        onRecordClick={(record: AirtableRecord) => {
          setError(record.fields.error);
          setTechnology(record.fields.technology);
          setWorkflow(record.fields.workflow);
          setAI(record.fields.ai);
        }}
      />
    </div>
  );
}

export default App;
