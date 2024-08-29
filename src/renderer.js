const { ipcRenderer } = require('electron');

// Example function to trigger opening of the URL
function openPrivateBrowser(url) {
    ipcRenderer.invoke('open-private-browser', url);
}

// Example: Replace with your own logic to get the current URL
const currentUrl = 'https://example.com';

// Call this function when needed
openPrivateBrowser(currentUrl);
