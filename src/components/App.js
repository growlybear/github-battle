import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Home from './Home'
import Battle from './Battle'
import Popular from './Popular'

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="container">
          <Nav />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/Battle" component={Battle} />
            <Route exact path="/popular" component={Popular} />
            <Route render={() => <p>Page Not Found 💩</p>} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App
