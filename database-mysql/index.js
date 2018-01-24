var mysql = require('mysql');
var request = require('request');
var config = require('../config.js');

var token = config.token;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'test'
});

var getChannels = function(callback) {
  var base = 'https://slack.com/api/channels.list';
  var url = `${base}?token=${token}`;
  request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

var getMessages = function(channel, callback) {
  var base = 'https://slack.com/api/channels.history';
  var url = `${base}?token=${token}&channel=${channel}`;
  console.log(url);
  request.get({
    url: url,
    json: true,
    headers: {'User-Agent': 'request'}
  }, (err, res, data) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports = {
  getChannels,
  getMessages
};
