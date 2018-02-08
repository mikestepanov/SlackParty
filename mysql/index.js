var mysql = require('mysql');
var request = require('request');
var config = require('../config.js');

var tokens88 = config.tokens88;
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

var memeIt = function(channel, messages, callback) {
  var parrots = ['gentlemanparrot', 'invisibleparrot', 	'jediparrot', 'middleparrot', 'partyparrot', 	'sadparrot', 'scienceparrot', 'ultrafastparrot', 'angelparrot', 'aussieparrot', 'birthdaypartyparrot', 'ceilingparrot',
'christmasparrot', 'congapartyparrot', 'dealwithitparrot', 'discoparrot', 'matrixparrot', 'moonwalkingparrot', 'pirateparrot', 'sithparrot', 'thumbsupparrot', 'upvotepartyparrot', 'wendyparrot'];;
  var angela = ['angela-admirable', 'angela-adorable', 'angela-adventurous', 'angela-artistic', 'angela-affable', 'angela-agile', 'angela-all-star', 'angela-ambitious', 'angela-american-airlines', 'angela-amused', 'angela-angelic', 'angela-angular', 'angela-app', 'angela-architecture', 'angela-array', 'angela-array-is-array', 'angela-ascendant', 'angela-asha', 'angela-astonishing', 'angela-asynchronous', 'angela-avid', 'angela-awesome', 'angela-aws'];
  var names = parrots;
  var time = Date.now();
  for (var tokenId of tokens88) {
    for (var j = 0; j < messages.length; j++) {
      var timeStamp = messages[j].ts;
      for (var i = 0; i < names.length; i++) {
        doSetTimeout(names[i], timeStamp, tokenId, i, j);
      }
    }
  }

  function doSetTimeout(name, timeStamp, tokenId, i, j) {
    setTimeout(function() { meme(name, timeStamp, tokenId) }, i * 100 + j * 2300);
  }

  function meme(name, timeStamp, tokenId) {
    var base = 'https://slack.com/api/reactions.add';
    var url = `${base}?token=${tokenId}&channel=${channel}&timestamp=${timeStamp}&name=${name}`;
    request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('err');
      } else {
        console.log(data);
      }
    });
  }
  callback(null, 555);
};


module.exports = {
  getPublicChannels,
  getPrivateChannels,
  getMessages,
  memeIt
};
