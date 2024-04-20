import { AirtableRecord } from "./index.ts";

const API_URL = `https://api.airtable.com/v0/${
  import.meta.env.VITE_DATABASENAME
}/${import.meta.env.VITE_TABLENAME}`;
const headers = {
  Authorization: `Bearer ${import.meta.env.VITE_URL_TOKEN_AIRTABLE}`,
  "Content-Type": "application/json",
};

// export async function getRecords() {
//   const response = await fetch(API_URL, { headers });
//   return response.json();
// }

export async function getRecords() {
  const response = await fetch(
    `${API_URL}?maxRecords=5&sort%5B0%5D%5Bfield%5D=createdTime&sort%5B0%5D%5Bdirection%5D=desc`,
    { headers }
  );
  return response.json();
}

export async function createRecord(record: Omit<AirtableRecord, 'id' | 'createdTime'>) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers,
    body: JSON.stringify({
      fields: record.fields
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}