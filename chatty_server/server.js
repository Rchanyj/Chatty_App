const express = require('express');
const SocketServer = require('ws').Server;

//set the port to 3001
const PORT = 3001;

//create a new express server
const server = express()
  //make the express server serve static assets (html, js, css) from /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

//create Websockets server
const wss = new SocketServer({ server });

//set up cb that will run when a client connects to server
//when client connects they are assigned a socket, represented by
//the ws parameter in the cb.
wss.on('connection', (ws) => {
  console.log('Client connected');

  //set up cb for when a client closes the socket (usually by closing browser)
  ws.on('close', () => console.log('Client disconnected'));
});