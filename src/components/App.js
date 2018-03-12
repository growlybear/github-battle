import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Popular from './Popular'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Route exact path="/" component={Home} />
          <Route exact path="/popular" component={Popular} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
