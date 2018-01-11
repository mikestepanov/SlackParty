var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database-mysql');
var config = require('../config.js');

var token = config.token;
console.log(token);

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/items', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

app.get('/channels', function(req, res) {
  var base = 'https://slack.com/api/channels.list';
  var url = `${base}?token=${token}`;
});
