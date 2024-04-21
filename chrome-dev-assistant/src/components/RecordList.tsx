import React from "react";

export function RecordList({ records, onRecordClick }) {
  return (
    <div className="space-y-4 mt-4 w-full">
      {records.map((record) => (
        <div
          key={record.id}
          className="bg-gray-700 p-4 rounded-lg shadow-md cursor-pointer text-color3"
          onClick={() => onRecordClick(record)}
        >
          <p className="font-bold">Error: {record.fields.error}</p>
          <p>Date: {record.createdTime}</p>
          <p>AI: {record.fields.ai}</p>
          <p>Workflow: {record.fields.workflow}</p>
          <p>Technology: {record.fields.technology}</p>
        </div>
      ))}
    </div>
  );
}
