const express = require('express');
const consign = require('consign');
const socket  = require('socket.io');
const http    = require('http');
const path    = require('path');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');

global.dir = {};

global.dir.root = __dirname;

global.dir.app = path.join(global.dir.root, 'app');

global.dir.routes = path.join(global.dir.app, 'routes');
global.dir.models = path.join(global.dir.app, 'models');
global.dir.views  = path.join(global.dir.app, 'views');

//global.db = require(path.join(global.dir.app, 'database.js'));

const app = express();

app.disable('x-powered-by');

const server = http.createServer(app);

global.io = socket.listen(server);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(fileUpload());

app.set('view engine', 'ejs');
app.set('views', global.dir.views);

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

