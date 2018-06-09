import React from 'react'
import $ from 'jquery'
import Channels from './Channels'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentChannel: {},
      messages: [],
    }
  }

  getMessages() {
    $.ajax({
      method: 'GET',
      url: '/messages',
      data: { channel: this.state.currentChannel.id },
      success: data => {
        this.setState({
          messages: data,
        })
      },
      error: err => {
        console.log('err', err)
      },
    })
  }

  memeIt() {
    $.ajax({
      method: 'POST',
      url: '/memeIt',
      contentType: 'application/json',
      data: JSON.stringify({
        channel: this.state.currentChannel.id,
        messages: this.state.messages,
      }),
      success: data => {
        console.log('ez', data)
      },
      error: err => {
        console.log('err', err)
      },
    })
  }

  onChannelChange(channel, channels) {
    this.setState(
      {
        currentChannel: channel,
      },
      () => {
        console.log(channel, channels)
        this.getMessages()
      },
    )
  }

  render() {
    const { messages, currentChannel } = this.state
    return (
      <div>
        <h5>Channel ID: {currentChannel ? currentChannel.id : 'loading'}</h5>
        <Channels onChannelChange={() => this.onChannelChange()} />
        <button onClick={() => this.memeIt()}>Meme This Channel</button>
        <ul>
          {messages.map((message, idx) => <li key={idx}>{message.text}</li>)}
        </ul>
      </div>
    )
  }
}

export default Main
