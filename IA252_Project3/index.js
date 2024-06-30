const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Redirect the root path to 'public/index.html'
app.get('/', (req, res) => {
  res.redirect('/index.html');
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
