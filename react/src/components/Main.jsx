import React from 'react'
import $ from 'jquery'
import Channels from './Channels.jsx'

class Main extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      currentChannel: {},
      messages: [],
    }

    this.getMessages = this.getMessages.bind(this)
    this.onChannelChange = this.onChannelChange.bind(this)
    this.memeIt = this.memeIt.bind(this)
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
      function() {
        this.getMessages()
      },
    )
  }

  render() {
    return (
      <div>
        <h5>Channel ID: {this.state.currentChannel.id}</h5>
        <Channels onChannelChange={this.onChannelChange} />
        <button onClick={this.memeIt}>Meme This Channel</button>
        <ul>
          {this.state.messages.map((message, idx) => (
            <li key={idx}>{message.text}</li>
          ))}
        </ul>
      </div>
    )
  }
}

export default Main
