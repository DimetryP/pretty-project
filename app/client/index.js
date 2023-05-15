require('dotenv').config();
const { app, BrowserWindow, contextBridge } = require('electron');
const server = require('../server/server');

let mainWindow;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1920,
    height: 1080,
    frame: false
  });

  win.loadURL(`http://127.0.0.1:${process.env.APP_PORT}`);
  win.webContents.openDevTools();
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit();
});
