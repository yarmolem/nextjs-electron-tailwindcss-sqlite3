import path from 'node:path'
import { app } from 'electron'

export const getDBPath = (filename: string): string => {
  let base = app.getAppPath()
  if (app.isPackaged) base = base.replace('app.asar', '')
  return path.resolve(base, `database/${filename}`)
}
