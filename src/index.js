const electron = require("electron");
const path = require("path");
const BrowserWindow = electron.remote.BrowserWindow;
const ipc = electron.ipcRenderer;

const map = document.getElementById("map");
var mapped = document.getElementById("mapped");

map.addEventListener("click", function (event) {
  const modalPath = path.join("file://", __dirname, "add.html");
  let win = new BrowserWindow({
    width: 300,
    height: 300,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.on("close", function () {
    win == null;
  });
  win.loadURL(modalPath);
  win.show();
});

ipc.on("updateValue", function (event, arg) {
  mapped.innerHTML = "Mapped key is: " + arg;
});

function on_click() {
  var check = document.getElementById("check");
  check.innerHTML = "Checking..";
  const { Board, Led } = require("johnny-five");
  const board = new Board({
    repl: false,
  });

  var stat = document.getElementById("devstat");

  board.on("ready", () => {
    check.innerHTML = "Check for H/W";
    stat.innerHTML = "Device ready at" + "  " + board.port;
    const led = new Led(13);
    led.blink(500);
  });
}
