
const express = require('express');
const app = express();
var path = require('path');
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

// const fetch = require('node-fetch');

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('public/imatges'));

app.get('/public/imatges/wallpaper.jpg', (req, res) => {
    res.sendFile(__dirname + '/public/imatges/wallpaper.jpg');
});

app.get('/public/imatges/marvelComics.jpg', (req, res) => {
    res.sendFile(__dirname + '/public/imatges/marvelComics.jpg');
});

io.on('connection', (socket) => {

    socket.on('dadesDesDelClient', async function (data) {
        console.log('SERVIDOR -> dades rebudes del client->' + data.dades);
        
        cap = new Headers();
        cap.append('Content-Type', 'application/json');
        var initPropi = {
            method: 'GET',
            headers: cap,
            mode: 'cors',
            cache: 'default',
            credentials: 'same-origin',
            redirect: 'follow',
            referrerPolicy: 'no-referrer'
        };
        var peticio = new Request('https://gateway.marvel.com:443/v1/public/comics?titleStartsWith='+data.dades+'&apikey=476dc1b2d49f463c22c34cb1578bfdd0&hash=653580380735072c47d7edc8e4d8254a&ts=1', initPropi);
    
        try {
            const response = await fetch(peticio);
            const data = await response.json();
            socket.emit('dadesAPI', { dades: data });
        } catch (error) {
            console.log(error);
        }
    });
});

http.listen(8888, () => {
    console.log('escoltant en http://localhost:8888');
});
