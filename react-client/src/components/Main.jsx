import React from 'react';
import $ from 'jquery';
import Channels from './Channels.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChannel: {},
      messages: []
    };

    this.getMessages = this.getMessages.bind(this);
    this.onChannelChange = this.onChannelChange.bind(this);
  }

  getMessages() {
    const that = this;
    $.ajax({
      method: 'GET',
      url: '/messages',
      data: {channel: that.state.currentChannel.id},
      success: (data) => {
        console.log(data);
        that.setState({
          messages: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  onChannelChange(channel) {
    this.setState({
      currentChannel: channel
    }, function() {
      this.getMessages();
    });
  }

  render () {
    return (
      <div>
        {this.state.currentChannel.id}
        <Channels onChannelChange={this.onChannelChange}/>
        <ul>
          {this.state.messages.map((message, idx) =>
            <li key={idx}>{message.text}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Main;
