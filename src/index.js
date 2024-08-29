const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { exec } = require('child_process');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'renderer.js'),
            contextIsolation: true,
            enableRemoteModule: false,
            nodeIntegration: false
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'index.html'));
}

app.whenReady().then(() => {
    createWindow();

    ipcMain.handle('open-private-browser', (event, url) => {
        const affiliateCode = 'your-affiliate-code';
        const affiliateUrl = `${url}?aff=${affiliateCode}`;

        // Define the command to open a private window in Chrome
        const command = `start chrome --incognito "${affiliateUrl}"`;

        // Execute the command
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error opening private browser: ${error}`);
                return;
            }
            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
        });
    });

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
