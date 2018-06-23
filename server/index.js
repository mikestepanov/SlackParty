const admin = require('firebase-admin')
const functions = require('firebase-functions')

import express from 'express'
import bodyParser from 'body-parser'
import requests from './requests'
import slack from './slack'

console.log(functions)

admin.initializeApp(functions.config().firebase)

export const app = express()
app.use(express.static(__dirname + '/../public'))
app.use(bodyParser.json({ limit: '50mb' }))

const port = process.env.PORT || 7777

app.listen(port, () => {
  console.log(`127.0.0.1:${port}`)
})

app.get('/channels', (req, res) => {
  requests.getPublicChannels((err, data) => {
    if (err) {
      console.log('WE ARE SCREWED AT /channels')
      res.sendStatus(500)
    } else {
      console.log(data.channels)
      res.json(data.channels)
    }
  })
})

app.get('/messages', (req, res) => {
  var channel = req.query.channel
  requests.getMessages(channel, (err, data) => {
    if (err) {
      console.log('WE ARE SCREWED AT /messages')
      res.sendStatus(500)
    } else {
      res.json(data.messages)
    }
  })
})

app.post('/memeIt', (req, res) => {
  const messages = req.body.messages
  const channel = req.body.channel
  const delay = req.body.delay
  const emojiTrain = req.body.emojiTrain
  requests.memeIt(channel, messages, delay, emojiTrain, (err, data) => {
    if (err) {
      console.log('WE ARE SCREWED AT /memeIt')
      res.sendStatus(500)
    } else {
      res.json('ez')
    }
  })
})

app.get('/slackauth', (req, res) => {
  res.json('sucess')
})

app.get('/func/timestamp', (req, res) => {
  res.send(`${Date.now()}`)
})

app.get('/func/timestamp-cached', (req, res) => {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  res.send(`${Date.now()}`)
})

export let ssrapp = functions.https.onRequest(app)
