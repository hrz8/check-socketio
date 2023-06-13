import dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import DB, { Save } from './models/index.js';

const PORT = process.env.PORT || 3005;

const app = express();
app.use(cors());

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

app.get('/fd-history/:id', function(req, res) {
    const histories = DB.ForumDiscussion.filter((fd) => fd.forum_id == req.params.id);
    res.json(histories);
});

io.on('connection', function(socket) {
    console.info('user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });    

    socket.on('sendToForum', function(msg) {
        const parsed = JSON.parse(msg);

        const newDiscussion = {
            forum_id: parsed.forum_id,
            user_id: parsed.user_id,
            message: parsed.message,
            sent_at: new Date(),
        };

        Save('ForumDiscussion', newDiscussion);

        io.emit('broadcastToFrontend', JSON.stringify(newDiscussion));
    });
});

server.listen(PORT, function() {
    console.info(`server run on http://localhost:${PORT}`);
});
