const { app, BrowserWindow, ipcMain } = require('electron');
const { exec } = require('child_process');
const path = require('path');
const WebSocket = require('ws');

let mainWindow;

// Function to create the main window
function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'src', 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
            // Enable web security if required for extension communication
        }
    });

    mainWindow.loadFile(path.join(__dirname, 'src', 'index.html'));
    mainWindow.webContents.openDevTools(); // Optional for debugging
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// Handle IPC call for opening a private browser with an affiliate URL
ipcMain.handle('open-private-browser', async (event, url) => {
    console.log('Received URL in main process:', url);

    const affiliateCode = 'your-affiliate-code'; // Replace with actual affiliate code
    const affiliateUrl = `${url}?aff=${affiliateCode}`;

    console.log('Affiliate URL:', affiliateUrl);

    // Command to open Chrome in incognito mode with the affiliate URL
    const command = `start chrome --incognito "${affiliateUrl}"`;

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error('Error opening private browser:', error);
            return;
        }
        console.log('Browser opened with URL:', affiliateUrl);
    });

    return 'Browser opened';
});

// Set up WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('WebSocket connection established');

    ws.on('message', (message) => {
        console.log('Received URL from extension:', message);

        // Forward URL to renderer process via IPC
        if (mainWindow) {
            mainWindow.webContents.send('capture-url', message);
        }
    });

    ws.on('close', () => {
        console.log('WebSocket connection closed');
    });
});
