const { app, BrowserWindow } = require('electron') 
const ipcMain = require('electron').ipcMain

let win; 

function createWindow() { 
// Create the browser window. 
win = new BrowserWindow({ 
	width: 400, 
	height: 400, 
	webPreferences: { 
	nodeIntegration: true
	} 
}) 

// and load the index.html of the app. 
win.loadFile('src/index.html') 

// Open the DevTools. 
// win.webContents.openDevTools() 

//Quit app when main BrowserWindow Instance is closed 
win.on('closed', function () { 
	app.quit(); 
}); 
} 

// This method will be called when the Electron has finished 
// initialization and is ready to create browser windows. 
// Some APIs can only be used after this event occurs. 
app.whenReady().then(createWindow) 

// Quit when all windows are closed. 
app.on('window-all-closed', () => { 
// On macOS it is common for applications and their menu bar 
// to stay active until the user quits explicitly with Cmd + Q 
if (process.platform !== 'darwin') { 
	app.quit() 
} 
}) 

app.on('activate', () => { 
// On macOS it's common to re-create a window in the app when the 
// dock icon is clicked and there are no other windows open. 
if (BrowserWindow.getAllWindows().length === 0) { 
	createWindow() 
} 
}) 

ipcMain.on('update-value', function (event, arg) { 
  console.log(arg); 
  win.webContents.send('updateValue', arg); 
}); 