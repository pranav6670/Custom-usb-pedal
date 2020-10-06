const { app, BrowserWindow } = require("electron");
const ipcMain = require("electron").ipcMain;

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 400,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  win.loadFile("src/index.html");

  // win.webContents.openDevTools()

  win.on("closed", function () {
    app.quit();
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.allowRendererProcessReuse = false;

ipcMain.on("update-value", function (event, arg) {
  console.log(arg);
  win.webContents.send("updateValue", arg);
});

