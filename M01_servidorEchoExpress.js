/*
 * Servidor amb ExpressJS que utilitza comunicacions amb WebSockets
 * @author  sergi.grau@fje.edu
 * @version 1.0 24.03.2021
 * format del document UTF-8
 *
 * CHANGELOG
 * @version 1.0 24.03.2021
 * - Servidor amb ExpressJS que utilitza comunicacions amb WebSockets
 *
 * NOTES
 * ORIGEN
 * Desenvolupament Aplicacions Web. Jesuïtes el Clot
 */

const express = require('express');
const app = express();
var path = require('path');

const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('public/imatges'));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.static(path.join(__dirname, 'public/imatges')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.get('/a', (req, res) => {
    res.sendFile(__dirname + '/M01_echo.html');
});

app.get('/M01_echo.js', (req, res) => {
    res.sendFile(__dirname + '/M01_echo.js');
});

app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/style.css');
});

app.get('/public/imatges/wallpaper.jpg', (req, res) => {
    res.sendFile(__dirname + '/public/imatges/wallpaper.jpg');
});

app.get('/public/imatges/marvelComics.jpg', (req, res) => {
    res.sendFile(__dirname + '/public/imatges/marvelComics.jpg');
});




io.on('connection', (socket) => {
    console.log('usuari connectat')
    socket.on('disconnect', () => {
        console.log('usuari desconnectat');
      });
    socket.emit('dadesDesDelServidor', { dades: 'ABC' });
    socket.on('dadesDesDelClient', function (data) {
        console.log('SERVIDOR -> dades rebudes del client->' + data.dades);
    });
});

http.listen(8888, () => {
    console.log('escoltant en http://localhost:8888');
});