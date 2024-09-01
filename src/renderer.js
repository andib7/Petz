document.getElementById('private-shopping-btn').addEventListener('click', () => {
    // Assuming `currentUrl` is obtained from your extension or other sources
    const currentUrl = 'https://www.example.com'; // Dummy URL for now
    
    window.electron.ipcRenderer.invoke('open-private-browser', currentUrl)
        .then(response => {
            console.log('Browser opened successfully:', response);
        })
        .catch(error => {
            console.error('Failed to open browser:', error);
        });
});
