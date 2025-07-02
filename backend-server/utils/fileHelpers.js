import { promises as fs } from "fs";

export async function readData(filePath) {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data || "[]");
  } catch (err) {
    // If file doesn't exist, return empty array
    return [];
  }
}

export async function writeData(filePath, data) {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}
