import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import Main from './components/Main.jsx'

class Shattarah extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return <Main />
  }
}

ReactDOM.render(<Shattarah />, document.getElementById('shattarah'))
