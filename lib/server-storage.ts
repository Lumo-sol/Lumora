import { readFile } from "node:fs/promises"
import path from "node:path"

const dataDirectory = path.join(process.cwd(), "data")
const configFilePath = path.join(dataDirectory, "config.json")

async function readJsonFile<T>(filePath: string, fallbackValue: T): Promise<T> {
  try {
    const fileContents = await readFile(filePath, "utf8")
    return JSON.parse(fileContents) as T
  } catch {
    return fallbackValue
  }
}

export interface RuntimeConfig {
  contractAddress: string
}

export async function readRuntimeConfig(fallbackValue: RuntimeConfig) {
  return readJsonFile(configFilePath, fallbackValue)
}
