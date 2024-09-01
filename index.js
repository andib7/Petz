const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js'), // Preload script path
            contextIsolation: true,
            nodeIntegration: false
        }
    });

    // Correct path to index.html
    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));

    // Open DevTools (optional, for debugging)
    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle IPC call for opening a private browser with an affiliate URL
ipcMain.handle('open-private-browser', (event, url) => {
    const affiliateCode = 'your-affiliate-code';  // Replace with your actual affiliate code
    const affiliateUrl = `${url}?aff=${affiliateCode}`;

    // Command to open Chrome in incognito mode with the affiliate URL
    const command = `start chrome --incognito "${affiliateUrl}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error opening private browser:', error);
            throw error;
        }
        console.log('Browser opened with URL:', affiliateUrl);
    });

    return 'Browser opened';
});
