var express = require('express');
var bodyParser = require('body-parser');

var items = require('../database-mysql');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log('listening on port 3000!');
});

app.get('/channels', function(req, res) {
  console.log('GOT INTO CHANNELS');
  items.getChannels(function(err, data) {
    console.log('data', data);
    if(err) {
      console.log('WE ARE SCREWED AT /channels');
      res.sendStatus(500);
    } else {
      res.json(data.channels);
    }
  });
});

app.get('/messages', function(req, res) {
  var channel = req.body.channel;
  console.log('GOT INTO MESSAGES');
  items.getMessages(channel, function(err, data) {
    console.log('data', data);
    if(err) {
      console.log('WE ARE SCREWED AT /messages');
      res.sendStatus(500);
    } else {
      res.json(data.channels);
    }
  });
});
