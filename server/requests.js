import request from 'request'
import config from '../config.js'

const tokensAll = config.tokens
const tokenPrime = tokensAll[0]

export const getPublicChannels = callback => {
  const base = 'https://slack.com/api/channels.list'
  const url = `${base}?token=${tokenPrime}`
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

export const getPrivateGroups = callback => {
  const base = 'https://slack.com/api/groups.list'
  const url = `${base}?token=${tokenPrime}`
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

export const getMessages = (channel, callback) => {
  const base = 'https://slack.com/api/channels.history'
  const url = `${base}?token=${tokenPrime}&channel=${channel}`
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

export const memeIt = (channel, messages, delay, emojiTrain, callback) => {
  // console.log(delay, emojiTrain);
  const parrots = [
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
  const fred = [
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
  emojiTrain = emojiTrain || fred
  delay = delay || 50
  for (let tokenId of tokensAll) {
    for (let j = 0; j < messages.length; j++) {
      var timeStamp = messages[j].ts
      for (let i = 0; i < emojiTrain.length; i++) {
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
    setTimeout(() => {
      meme(emojiName, timeStamp, tokenId)
    }, i * delay + j * (emojisLength * delay))
  }

  const meme = (emojiName, timeStamp, tokenId) => {
    const base = 'https://slack.com/api/reactions.add'
    const url = `${base}?token=${tokenId}&channel=${channel}&timestamp=${timeStamp}&name=${emojiName}`
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
