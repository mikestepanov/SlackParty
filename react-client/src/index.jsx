import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      channels: [],
      currentChannel: ''
    }

    this.getChannels = this.getChannels.bind(this);
    this.getMessages = this.getMessages.bind(this);

    this.getChannels();
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
  }

  getChannels() {
    const that = this;
    $.ajax({
      method: 'GET',
      url: '/channels',
      success: (data) => {
        console.log('data', data);
        that.setState({
          channels: data,
          currentChannel: data[0]
        })
      },
      error: (err) => {
        console.log('err', err);
      }
    });
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
      <List items={this.state.items}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
