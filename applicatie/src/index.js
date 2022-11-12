"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path = require('path');
require('update-electron-app')();
if (require('electron-squirrel-startup'))
    electron_1.app.quit();
electron_1.app.commandLine.appendSwitch('enable-features', 'InsecurePrivateNetworkRequestsAllowed');
const createWindow = () => {
    // Create the browser window.
    const mainWindow = new electron_1.BrowserWindow({
        webPreferences: {
            webSecurity: false,
        },
    });
    // and load the index.html of the app.
    //mainWindow.loadURL("https://camera-control-ijwg.vercel.app/")
    mainWindow.loadFile(`${path.join(__dirname, "../site/index.html")}`);
    //mainWindow.loadURL("http://localhost:3000")
    require('./server/server');
};
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
electron_1.app.on('ready', createWindow);
// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        electron_1.app.quit();
    }
});
electron_1.app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (electron_1.BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
//# sourceMappingURL=index.js.map