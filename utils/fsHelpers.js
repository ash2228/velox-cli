import fs from 'fs'
import path from 'path'

export function copyComponent(fromPath, toPath) {
  fs.mkdirSync(path.dirname(toPath), { recursive: true })
  fs.copyFileSync(fromPath, toPath)
}
