import fs from 'fs'
import sqlite3 from 'sqlite3'
import serve from 'electron-serve'

import { app, ipcMain } from 'electron'
import { createWindow } from './helpers'
import { getDBPath } from './helpers/getDBPath'

const dbPath = getDBPath('db.sqlite3')
const Database = sqlite3.verbose().Database
const db = new Database(dbPath)

const isProd: boolean = process.env.NODE_ENV === 'production'

if (isProd) {
  serve({ directory: 'app' })
} else {
  app.setPath('userData', `${app.getPath('userData')} (development)`)
}

;(async () => {
  await app.whenReady()

  const mainWindow = createWindow('main', {
    width: 1000,
    height: 600
  })

  if (isProd) {
    await mainWindow.loadURL('app://./home.html')
  } else {
    const port = process.argv[2]
    await mainWindow.loadURL(`http://localhost:${port}/home`)
    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => {
  app.quit()
})

ipcMain.handle('msg_1', () => {
  const jsonpath = getDBPath('test.json')
  const rawData = fs.readFileSync(jsonpath, 'utf-8')
  return JSON.parse(rawData).name
})

ipcMain.handle('msg_2', async () => {
  const res = await new Promise((resolve) => {
    db.all('SELECT * FROM Store;', (error, row) => {
      if (error) return resolve(null)
      resolve(row)
    })
  })

  return res
})
