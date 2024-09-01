chrome.browserAction.onClicked.addListener((tab) => {
  const url = tab.url;
  console.log('Capturing URL:', url);

  // Connect to the WebSocket server
  const ws = new WebSocket('ws://localhost:8080');
  ws.onopen = () => {
      ws.send(url);
      console.log('URL sent to Electron app');
  };

  ws.onmessage = (message) => {
      console.log('Message from Electron app:', message.data);
  };

  ws.onerror = (error) => {
      console.error('WebSocket error:', error);
  };
});
