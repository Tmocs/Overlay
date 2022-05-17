const { app, BrowserWindow, Tray } = require('electron')
const path = require('path')
const url = require('url')
require('./index.js');

const createWindow = () => {
	const win = new BrowserWindow({
		width: 1270,
		height: 720,
		webPreferences: {
			nodeIntegration: true,
			enableRemoteModule: true
			// preload: path.join(__dirname, 'scripts/preload.js')
		}
	})

	win.loadURL(`http://localhost:3420`);

	win.focus();
}

app.whenReady().then(() => {
	createWindow()

	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit()
})

try {
	require('electron-reloader')(module)
} catch (_) {}

