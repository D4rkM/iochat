const path = require('path');

const User = require(path.join(global.dir.models, 'user.js'));
const chat = require(path.join(global.dir.models, 'chat.js'));

module.exports = io => {

    io.on('connection', socket => {

        socket.on('join', user => {

            
        });

        socket.on('login', userData => {




            socket.on('message', (user, message, to) => {

            

            });

        });

        socket.on('disconnect', () => {


        });

    });

}