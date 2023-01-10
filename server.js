const express = require('express');
const app = express();
const server = require('http').createServer(app); // SocketIO uses http instead of express
const io = require('socket.io')(server); // COnnecting the SocketIO to my PORT number 
const path = require('path');

require('dotenv').config();


const PORT = process.env.PORT || 8000;

//MIDDLEWARE
app.use(express.static(path.join(__dirname + '/static')));


io.on('connection', socket => {
    console.log('Socket Connected', socket.id);

    socket.on('disconnect', () => {
        console.log(socket.id, 'has disconnected :(');
    });

    socket.on('send', (data) => {
        console.log(socket);
        io.emit("server-message", data);
    })
});

server.listen(PORT, () => {
    console.log(`Listening to Port: ${PORT}`);
});