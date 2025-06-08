import axios from 'axios'
import { existsSync, mkdirSync } from 'fs'
import { readFile, writeFile } from 'fs/promises'
import { createHash } from 'crypto'

export async function fetchOrCache(
  url: string,
  ignoreCache = false,
): Promise<string | undefined> {
  if (!existsSync('.cache')) {
    mkdirSync('.cache')
  }

  const hash = createHash('sha1').update(url).digest('hex')
  const cachePath = `.cache/${hash}.html`

  if (
    !ignoreCache &&
    existsSync(cachePath)
  ) {
    const HTMLData = await readFile(
      cachePath,
      { encoding: 'utf8' },
    )
    return HTMLData
  } else {
    try {
      const { data: HTMLData } = await axios.get(url)
      if (!ignoreCache && HTMLData) {
        writeFile(
          cachePath,
          HTMLData,
          { encoding: 'utf8' },
        )
      }
      return HTMLData
    } catch (error) { }
  }
}