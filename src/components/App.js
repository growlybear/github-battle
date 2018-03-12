import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Popular from './Popular'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <Route path="/" component={Popular} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
