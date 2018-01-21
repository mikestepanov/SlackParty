import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Channels from './components/Channels.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      channels: [],
      currentChannelId: ''
    }

    this.getMessages = this.getMessages.bind(this);
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

  render () {
    return (<div>
      <h1 onClick={this.getMessages}>Item List</h1>
      <Channels items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
