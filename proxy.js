const express = require('express');
const fetch = require('node-fetch'); // Make sure node-fetch is installed
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoint to fetch the RSS feed
app.get('/rss', async (req, res) => {
  try {
    const response = await fetch('https://www.chronicle.co.zw/feed/');
    const data = await response.text();
    res.set('Content-Type', 'application/rss+xml');
    res.send(data);
  } catch (error) {
    console.error('Error fetching RSS feed:', error);
    res.status(500).send('Error fetching RSS feed');
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
