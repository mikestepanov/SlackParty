import React from 'react';
import $ from 'jquery';
import Channels from './Channels.jsx';

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentChannel: {}
    }

    this.getMessages = this.getMessages.bind(this);
    this.onChannelChange = this.onChannelChange.bind(this);
  }

  getMessages() {
    const that = this;
    $.ajax({
      method: 'GET',
      url: '/messages',
      success: (data) => {
        console.log('data', data);
        that.setState({
          channels: data
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
    })
  }

  render () {
    return (
      <div>
        {this.state.currentChannel.id}
        <h1 onClick={this.getMessages}>Item List</h1>
        <Channels onChannelChange={this.onChannelChange}/>
      </div>
    );
  }
}

export default Main;
