'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ssrapp = exports.app = undefined;

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _requests = require('./requests');

var _requests2 = _interopRequireDefault(_requests);

var _slack = require('./slack');

var _slack2 = _interopRequireDefault(_slack);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var admin = require('firebase-admin');
var functions = require('firebase-functions');

console.log(functions);

admin.initializeApp(functions.config().firebase);

var app = exports.app = (0, _express2.default)();
app.use(_express2.default.static(__dirname + '/../public'));
app.use(_bodyParser2.default.json({ limit: '50mb' }));

var port = process.env.PORT || 7777;

app.listen(port, function () {
  console.log('127.0.0.1:' + port);
});

app.get('/channels', function (req, res) {
  _requests2.default.getPublicChannels(function (err, data) {
    if (err) {
      console.log('WE ARE SCREWED AT /channels');
      res.sendStatus(500);
    } else {
      console.log(data.channels);
      res.json(data.channels);
    }
  });
});

app.get('/messages', function (req, res) {
  var channel = req.query.channel;
  _requests2.default.getMessages(channel, function (err, data) {
    if (err) {
      console.log('WE ARE SCREWED AT /messages');
      res.sendStatus(500);
    } else {
      res.json(data.messages);
    }
  });
});

app.post('/memeIt', function (req, res) {
  var messages = req.body.messages;
  var channel = req.body.channel;
  var delay = req.body.delay;
  var emojiTrain = req.body.emojiTrain;
  _requests2.default.memeIt(channel, messages, delay, emojiTrain, function (err, data) {
    if (err) {
      console.log('WE ARE SCREWED AT /memeIt');
      res.sendStatus(500);
    } else {
      res.json('ez');
    }
  });
});

app.get('/slackauth', function (req, res) {
  res.json('sucess');
});

app.get('/func/timestamp', function (req, res) {
  res.send('' + Date.now());
});

app.get('/func/timestamp-cached', function (req, res) {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
  res.send('' + Date.now());
});

var ssrapp = exports.ssrapp = functions.https.onRequest(app);