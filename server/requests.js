var request = require('request')
var config = require('../config.js')

var tokensAll = config.tokens
var tokenPrime = tokensAll[0]

var getPublicChannels = function(callback) {
  var base = 'https://slack.com/api/channels.list'
  var url = `${base}?token=${tokenPrime}`
  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, res, data) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    },
  )
}

var getPrivateGroups = function(callback) {
  var base = 'https://slack.com/api/groups.list'
  var url = `${base}?token=${tokenPrime}`
  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, res, data) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    },
  )
}

var getMessages = function(channel, callback) {
  var base = 'https://slack.com/api/channels.history'
  var url = `${base}?token=${tokenPrime}&channel=${channel}`
  request.get(
    {
      url: url,
      json: true,
      headers: { 'User-Agent': 'request' },
    },
    (err, res, data) => {
      if (err) {
        callback(err, null)
      } else {
        callback(null, data)
      }
    },
  )
}

var memeIt = function(channel, messages, delay, emojiTrain, callback) {
  // console.log(delay, emojiTrain);
  var parrots = [
    'gentlemanparrot',
    'invisibleparrot',
    'jediparrot',
    'middleparrot',
    'partyparrot',
    'sadparrot',
    'scienceparrot',
    'ultrafastparrot',
    'angelparrot',
    'aussieparrot',
    'birthdaypartyparrot',
    'ceilingparrot',
    'christmasparrot',
    'congapartyparrot',
    'dealwithitparrot',
    'discoparrot',
    'matrixparrot',
    'moonwalkingparrot',
    'pirateparrot',
    'sithparrot',
    'thumbsupparrot',
    'upvotepartyparrot',
    'wendyparrot',
  ]
  var fred = [
    'fred-fabulous',
    'fred-fair',
    'fred-fancy',
    'fred-fantabulous',
    'fred-fantastic',
    'fred-fine',
    'fred-flawless',
    'fred-flexible',
    'fred-fredness',
    'fred-fast',
    'fred-faster',
    'fred-fastest',
    'fred-fisherman',
    'fred-firefighter',
    'fred-fjord',
    'fred-functional',
    'fred-frozen',
    'fred-fries',
    'fred-flexbox',
    'fred-font-face',
    'fred-frappuccino',
    'fredmoji',
    'fred-friend',
  ]
  var emojiTrain = emojiTrain || fred
  var delay = delay || 50
  for (var tokenId of tokensAll) {
    for (var j = 0; j < messages.length; j++) {
      var timeStamp = messages[j].ts
      for (var i = 0; i < emojiTrain.length; i++) {
        doSetTimeout(
          emojiTrain[i],
          timeStamp,
          tokenId,
          i,
          j,
          delay,
          emojiTrain.length,
        )
      }
    }
  }

  function doSetTimeout(
    emojiName,
    timeStamp,
    tokenId,
    i,
    j,
    delay,
    emojisLength,
  ) {
    setTimeout(function() {
      meme(emojiName, timeStamp, tokenId)
    }, i * delay + j * (emojisLength * delay))
  }

  function meme(emojiName, timeStamp, tokenId) {
    var base = 'https://slack.com/api/reactions.add'
    var url = `${base}?token=${tokenId}&channel=${channel}&timestamp=${timeStamp}&name=${emojiName}`
    request.get(
      {
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' },
      },
      (err, res, data) => {
        if (err) {
          console.log('err')
        } else {
          console.log(data)
        }
      },
    )
  }
  callback(null, 555)
}

module.exports = {
  getPublicChannels,
  getPrivateGroups,
  getMessages,
  memeIt,
}
