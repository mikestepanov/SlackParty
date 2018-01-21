import React from 'react';
import $ from 'jquery';

class Channels extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      channels: [],
      selectedChannel: {}
    };

    this.getChannels = this.getChannels.bind(this);
    this.getChannels();
  }

  getChannels() {
    $.ajax({
      method: 'GET',
      url: '/channels',
      success: (data) => {
        console.log('data', data);
        this.setState({
          channels: data,
          currentChannelId: data[0]
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  render() {
    return (
      <div id="channels">
        <h1>f</h1>
        {this.state.channels.length}
        <select>
          {this.state.channels.map((channel, idx) =>
            <option key={idx}>{channel.name}</option>
          )}
        </select>
      </div>
    );
  }
}

export default Channels;
