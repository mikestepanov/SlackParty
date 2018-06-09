var express = require('express')
var bodyParser = require('body-parser')
var requests = require('./requests')

var app = express()
app.use(express.static(__dirname + '/../react/dist'))
app.use(bodyParser.json({ limit: '50mb' }))
var port = process.env.PORT || 7777

app.listen(port, function() {
  console.log(`127.0.0.1:${port}`)
})

app.get('/channels', function(req, res) {
  requests.getPublicChannels(function(err, data) {
    if (err) {
      console.log('WE ARE SCREWED AT /channels')
      res.sendStatus(500)
    } else {
      console.log(data.channels)
      res.json(data.channels)
    }
  })
})

app.get('/messages', function(req, res) {
  var channel = req.query.channel
  requests.getMessages(channel, function(err, data) {
    if (err) {
      console.log('WE ARE SCREWED AT /messages')
      res.sendStatus(500)
    } else {
      res.json(data.messages)
    }
  })
})

app.post('/memeIt', function(req, res) {
  var messages = req.body.messages
  var channel = req.body.channel
  var delay = req.body.delay
  var emojiTrain = req.body.emojiTrain
  requests.memeIt(channel, messages, delay, emojiTrain, function(err, data) {
    if (err) {
      console.log('WE ARE SCREWED AT /memeIt')
      res.sendStatus(500)
    } else {
      res.json('ez')
    }
  })
})
