const express = require('express');
const app = express();
const port = 3000;

app.get('/api/whoami', (req, res) => {
  res.json({
    ipaddress: req.connection.remoteAddress,
    language: req.get('accept-language'),
    software: req.get('user-agent'),
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}/api/whoami`);
});
