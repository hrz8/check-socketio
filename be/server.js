import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import { Server } from 'socket.io';

const PORT = process.env.PORT || 3005;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: process.env.SOCKET_ORIGIN,
        methods: ['GET', 'POST'],
    }
});

app.post('/login', function(req, res) {
    res.json({
        token: '12345678',
    });
});

app.post('/register', function(req, res) {
    res.json({
        id: 99,
    });
});

io.on('connection', function(socket) {
    console.info('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });    

    socket.on('sendMessage', function(msg) {
        io.emit('sendMessage', msg);
    });
})

server.listen(PORT, function() {
    console.info(`server run on http://localhost:${PORT}`);
});
