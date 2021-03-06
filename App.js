const express = require('express');
const react = require('react');
const app = express();
const engine = require('ejs-mate');
const path = require('path');
const http = require('http');
const server = http.createServer(app);

const { Server, Socket } = require("socket.io");
const io = new Server(server);

//settings
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(require('./routes/index.js'));
app.use(express.static(path.join(__dirname, './public')));

io.sockets.on('connection', (socket) => {  
    socket.on('CHAT', (msg) => {
        var date = new Date;
        var minutes = date.getMinutes();
        var hour = date.getHours();
        today = hour + ':' + minutes;
        io.emit('CHAT',{
            message: msg.message,
            name: msg.name,
            date: today
        });
    });

    socket.on('FIX', msg => {
        io.emit('FIX', {
            code: msg.code
        })
    })
  });

server.listen(3000, (sockets) => {
    console.log("listening on port 3000");
})