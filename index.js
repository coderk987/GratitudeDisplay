const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

let mainWindow;
let addWindow;

app.on("ready", function () {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  mainWindow.loadFile("main.html");
  const mainMenu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(mainMenu);
  mainWindow.on("closed", function () {
    app.quit();
  });
});

ipcMain.on("input:add", (e, data) => {
  mainWindow.webContents.send("input:add", data);
  addWindow.close();
  console.log(data);
});

function AddWindow() {
  addWindow = new BrowserWindow({
    width: 400,
    height: 250,
    title: "Add Gratitude",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  addWindow.loadFile("add.html");
}

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Add Text",
        click() {
          AddWindow();
        },
      },
      {
        label: "Quit",
        click() {
          app.quit();
        },
      },
    ],
  },
];

if (process.env.NODE_ENV !== "production") {
  menuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        role: "reload",
      },
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
    ],
  });
}
