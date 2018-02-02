var mysql = require('mysql');
var request = require('request');
var config = require('../config.js');

var token = config.token;

var getPublicChannels = function(callback) {
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

var getPrivateChannels = function(callback) {
  var base = 'https://slack.com/api/groups.list';
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

var memeIt = function(channel, timeStamp, callback) {
  var names = ['angela-admirable', 'angela-adorable', 'angela-adventurous', 'angela-artistic', 'angela-affable', 'angela-agile', 'angela-all-star', 'angela-ambitious', 'angela-american-airlines', 'angela-amused', 'angela-angelic', 'angela-angular', 'angela-app', 'angela-architecture', 'angela-array', 'angela-array-is-array', 'angela-ascendant', 'angela-asha', 'angela-astonishing', 'angela-asynchronous', 'angela-avid', 'angela-awesome', 'angela-aws'];
  for (var i = 0; i < names.length; i++) {
    var base = 'https://slack.com/api/reactions.remove';
    var url = `${base}?token=${token}&channel=${channel}&timestamp=${timeStamp}&name=${names[i]}`;
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
    });
  }
  callback(null, data);
};


module.exports = {
  getPublicChannels,
  getPrivateChannels,
  getMessages,
  memeIt
};
