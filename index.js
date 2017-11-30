var express = require('express');

var app = express();

app.use(express.static(__dirname + '/build'));
app.use('/static', express.static(__dirname + '/src/static'));
app.use('/media', express.static(__dirname + '/src/media'));
app.use('/api', express.static(__dirname + '/src/blocks'));

app.listen(3000, function () { console.log('started server'); });
