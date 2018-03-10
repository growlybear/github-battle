import React, { Component } from 'react'
import ReactDOM from 'react-dom'

require('./index.css')

class App extends Component {
  render () {
    return <h1>Hello!</h1>
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
