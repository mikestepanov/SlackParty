const functions = require('firebase-functions')

const express = require('express')

const app = express()

app.get('/func/timestamp', (req, res) => {
  res.send(`${Date.now()}`)
})

app.get('/func/timestamp-cached', (req, res) => {
  res.set('Cache-Control', 'public, max-age=600, s-maxage=1200')
  res.send(`${Date.now()}`)
})

exports.app = functions.https.onRequest(app)
