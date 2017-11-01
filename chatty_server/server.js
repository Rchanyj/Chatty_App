const express = require('express');
const SocketServer = require('ws').Server;
const generateId = require('uuid/v4');

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
  ws.on('message', function incoming(message) {
    console.log('received message: ', message);
    const parsedMessage = JSON.parse(message);
    const id = generateId(message.id);
    const newMessage = {
      id,
      username: parsedMessage.username,
      content: parsedMessage.content
    };
    //broadcast to all:
    wss.clients.forEach((client) => {
      if (client.readyState === ws.OPEN) {
        client.send(JSON.stringify(newMessage));
      }
    });
  });

  //set up cb for when a client closes the socket (usually by closing browser)
  ws.on('close', () => console.log('Client disconnected'));
});





















