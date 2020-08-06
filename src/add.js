const electron = require('electron')
const path = require('path')

document.addEventListener("keydown", function (event) {
  document.getElementById("keys").innerHTML = `
  <b>Current Key: </b> ${event.key}`;
});
