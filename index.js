var SlackBot = require('slackbots')

// create a bot
var bot = new SlackBot({
  token: 'xoxb-379718967319-379735942519-MLyjkIVgrpd6cbzYyHqTkyg2',
  name: 'jokebot132',
})

var params = {
  icon_emoji: ':cat:',
}

bot.on('start', () => {
  // more information about additional params https://api.slack.com/methods/chat.postMessage

  // define channel, where bot exist. You can adjust it there https://my.slack.com/services
  // bot.postMessageToChannel('general', 'reloaded', params)

  // define existing username instead of 'user_name'
  bot.postMessageToUser('user_name', 'meow!', params)

  // If you add a 'slackbot' property,
  // you will post to another user's slackbot channel instead of a direct message
  bot.postMessageToUser('user_name', 'meow!', {
    slackbot: true,
    icon_emoji: ':cat:',
  })

  // define private group instead of 'private_group', where bot exist
  bot.postMessageToGroup('private_group', 'meow!', params)
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
  if (message.includes(' chucknorris')) {
    bot.postMessageToChannel('general', 'chucknorris joke', params)
  }
}
