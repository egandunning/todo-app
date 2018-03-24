const express = require('express');
const http = require('http');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/dist'));

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});

const port = process.env.PORT || 3000;
app.set(port);

const server = http.createServer(app);

server.listen(port, function() {
    console.log('server listening on port ' + port);
});
