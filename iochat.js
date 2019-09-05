const express = require('express');
const consign = require('consign');
const socket  = require('socket.io');
const http    = require('http');
const path    = require('path');

global.dir = {};

global.dir.root = __dirname;

global.dir.app = path.join(global.dir.root, 'app');

global.dir.routes = path.join(global.dir.app, 'routes');
global.dir.models = path.join(global.dir.app, 'models');

//global.db = require(path.join(global.dir.app, 'database.js'));

const app = express();

app.disable('x-powered-by');

const server = http.createServer(app);

global.io = socket.listen(server);

const port = process.env.PORT || 8080;

consign({
    cwd:global.dir.app
}).include('modals')
  .then('controllers')
  .into(global);

consign({
    cwd: global.dir.app
}).include('routes').into(app);

server.listen(port, () => {

    console.log(`Server ${process.env.APPNAME} startet at port ${port}`);

    require('./socket.js')(global.io);

});

