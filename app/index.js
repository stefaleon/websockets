const http = require('http');
const express = require('express');

const HTTP_PORT = process.env.HTTP_PORT || 3000;

const app = express();
const server = http.createServer(app);

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ main: 'ok' });
});

server.listen(HTTP_PORT, () => console.log(`Listening on port: ${HTTP_PORT}`));
