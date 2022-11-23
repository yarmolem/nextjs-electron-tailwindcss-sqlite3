import 'reflect-metadata'
import serve from 'electron-serve'

import { app } from 'electron'
import { createWindow } from './helpers'
import { AppDataSource } from './data-source'

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

    AppDataSource.initialize()
      .then(() => console.log('CONNECTED_DB'))
      .catch(() => console.log('ERROR_CONNECT_DB'))

    mainWindow.webContents.openDevTools()
  }
})()

app.on('window-all-closed', () => app.quit())
