import dotenv from 'dotenv';
dotenv.config();

import express from 'express';

const app = express();

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

app.listen(3033, function() {
    console.info('server run');
});
