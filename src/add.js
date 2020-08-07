const electron = require("electron");
const path = require("path");
const ipc = electron.ipcRenderer;
const remote = electron.remote;

var mapper = document.getElementById("mapper");

document.addEventListener("keydown", function (event) {
  document.getElementById("keys").innerHTML = `
  <b>Current Key: </b> ${event.key}`;

  mapper.addEventListener("click", function () {
    ipc.send("update-value", event.key);
    remote.getCurrentWindow().close();
  });
});
