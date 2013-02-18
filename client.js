"use strict";
var userName = 'yech';
process.argv.forEach(function (val, index) {
    if(index===2){
        userName = val;
    }
});
var io = require('socket.io-client');
var socket = io.connect('http://localhost:8124');
socket.on('connect', function(){
    console.log("connecting");
    socket.emit('addme',userName);
});
socket.on('chat',function (username, data) {
    console("receive msg-->"+username+":"+data);
});

