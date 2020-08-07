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


function on_exec() {
  var exec = document.getElementById('exec');
  var stat = document.getElementById("devstat");
  var status = document.getElementById('keystat');

  exec.innerHTML = "Checking for device..."

  var five = require("johnny-five"),
    board,
    button;

  board = new five.Board({
    repl: false,
  });

  board.on("ready", function () {
    exec.innerHTML = "Running...";
    stat.innerHTML = "Device ready at" + "  " + board.port;

    button = new five.Button(2);

    button.on("down", function () {
      status.innerHTML = "Down";
    });

    button.on("hold", function () {
      status.innerHTML = "Hold";

    });

    button.on("up", function () {
      status.innerHTML = "Up";

    });
  });
}
