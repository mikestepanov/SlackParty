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

var SlackBot = require('slackbots')
var axios = require('axios')

// create a bot
const bot = new SlackBot({
  token: 'xoxb-379718967319-379735942519-MLyjkIVgrpd6cbzYyHqTkyg2',
  name: 'Ragnaros, the Firelord',
})

const botParams = {
  slackbot: true,
}

bot.on('start', () => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  // bot.postMessageToChannel('general', 'reloaded', params)

  // define existing username instead of 'user_name'
  bot.postMessageToUser('user_name', 'meow!', botParams)

  // If you add a 'slackbot' property,
  // you will post to another user's slackbot channel instead of a direct message
  bot.postMessageToUser('user_name', 'meow!', botParams)

  // define private group instead of 'private_group', where bot exist
  bot.postMessageToGroup('private_group', 'meow!', botParams)
})

bot.on('error', error => {
  console.log('error => ', error)
})

bot.on('message', data => {
  if (data.type !== 'message' || data.username === bot.name) {
    return
  }

  console.log('message => ', data)
  handleMessage(data.text, data.channel)
})

const handleMessage = (message, channel) => {
  console.log(message, channel)
  if (message.includes(' chucknorris') || message.includes(' Chuck Norris')) {
    makeChuckNorrisJoke('general')
  } else if (message.includes(' yomomma') || message.includes(' Yo Momma')) {
    makeYoMommaJoke('general')
  } else if (message.includes(' random')) {
    makeRandomJoke('general')
  }
}

const makeChuckNorrisJoke = channel => {
  axios('http://api.icndb.com/jokes/random').then(result => {
    const joke = result.data.value.joke
    bot.postMessageToChannel(channel, joke, botParams)
  })
}

const makeYoMommaJoke = channel => {
  axios('http://api.yomomma.info').then(result => {
    const joke = result.data.joke
    bot.postMessageToChannel(channel, joke, botParams)
  })
}

const makeRandomJoke = channel => {
  const rand = Math.round(Math.random())
  if (rand === 0) {
    makeChuckNorrisJoke('general')
  } else {
    makeYoMommaJoke('general')
  }
}
