const express = require('express');
const app = express();
const server = require('http').createServer(app); // SocketIO uses http instead of express
const io = require('socket.io')(server); // COnnecting the SocketIO to my PORT number 
const path = require('path');

require('dotenv').config();


const PORT = process.env.PORT || 8000;

let users = {};
//MIDDLEWARE
app.use(express.static(path.join(__dirname + '/static')));


io.on('connection', socket => {
    socket.on('disconnect', () => {
        console.log(socket.id, 'has disconnected :(');
    });

    socket.on('send', (data) => {
        socket.broadcast.emit("server-message", data);
    });

    socket.on('set-user', (username) => {
        users[socket.id] = username;
        socket.broadcast.emit('user-set', username);
        // console.log(users);
    });
});

server.listen(PORT, () => {
    console.log(`Listening http://localhost:${PORT}`);
});