const fs = require('fs');
const http = require('http');
const express = require('express');
const app = express();
const path = require('path');
app.use('/static', express.static(path.join(__dirname, 'static')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'templates','views'));

const hostname = '192.168.1.3';
const port = process.env.port | 3000;
const router = require('./routers/websiterouter.js');
app.use(router);

app.listen(port, hostname, () => {
  console.log('Server running at port', port);
});
