var mysql = require('mysql');
var request = require('request');
var config = require('../config.example.js');

var token = config.token;

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'pass',
  database : 'test'
});

var selectAll = function(callback) {
  connection.query('SELECT * FROM items', function(err, results, fields) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

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

module.exports.selectAll = selectAll;
module.exports.getChannels = getChannels;
