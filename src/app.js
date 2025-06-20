// Minimal Express app for health check testing

const express = require('express');
const app = express();

app.get('/health', (req, res) => {
  res.json({ status: 'up' });
});

module.exports = app;