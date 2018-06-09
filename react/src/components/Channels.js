import React from 'react'
import $ from 'jquery'

class Channels extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      channels: [],
      selectedChannel: {},
    }
  }

  componentDidMount() {
    $.ajax({
      method: 'GET',
      url: '/channels',
      success: data => {
        let filteredData = []
        for (let channel of data) {
          if (!channel.is_archived) {
            filteredData.push(channel)
          }
        }
        this.setState(
          {
            channels: filteredData,
            selectedChannel: filteredData[0],
          },
          () => {
            this.props.onChannelChange(this.state.selectedChannel)
          },
        )
      },
      error: err => {
        console.log('err', err)
      },
    })
  }

  onChannelChange(event) {
    for (let channel of this.state.channels) {
      if (channel.name === event.target.value) {
        this.setState(
          {
            selectedChannel: channel,
          },
          function() {
            this.props.onChannelChange(this.state.selectedChannel)
          },
        )
      }
    }
  }

  render() {
    const { channels } = this.state
    return (
      <div id="channels">
        <span> Channels: </span>
        <select onChange={() => this.onChannelChange()}>
          {channels.map(channel => (
            <option key={channel.id}>{channel.name}</option>
          ))}
        </select>
      </div>
    )
  }
}

export default Channels
