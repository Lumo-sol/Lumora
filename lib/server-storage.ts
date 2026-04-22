import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"

const dataDirectory = path.join(process.cwd(), "data")
const configFilePath = path.join(dataDirectory, "config.json")

async function ensureDataDirectory() {
  await mkdir(dataDirectory, { recursive: true })
}

async function readJsonFile<T>(filePath: string, fallbackValue: T): Promise<T> {
  try {
    const fileContents = await readFile(filePath, "utf8")
    return JSON.parse(fileContents) as T
  } catch {
    return fallbackValue
  }
}

async function writeJsonFile<T>(filePath: string, value: T) {
  await ensureDataDirectory()
  await writeFile(filePath, JSON.stringify(value, null, 2), "utf8")
}

export interface RuntimeConfig {
  contractAddress: string
}

export async function readRuntimeConfig(fallbackValue: RuntimeConfig) {
  return readJsonFile(configFilePath, fallbackValue)
}

export async function writeRuntimeConfig(value: RuntimeConfig) {
  await writeJsonFile(configFilePath, value)
}
