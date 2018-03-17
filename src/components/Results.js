import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import queryString from 'query-string'

import api from '../utils/api'

class Results extends Component {
  constructor(props) {
    super(props)
    this.state = {
      winner: null,
      loser: null,
      error: null,
      loading: true
    }
  }

  componentDidMount () {
    const players = queryString.parse(this.props.location.search)
    api.battle([
        players.playerOneName,
        players.playerTwoName
    ]).then(results => {
      console.log('yay!', results)
      if (!results) {
        return this.setState(() => {
          return {
            error: 'Error retrieving information from Github. Please ensure both users exist.',
            loading: false
          }
        })
      } else {
        return this.setState(() => ({
          error: null,
          winner: results[0],
          loser: results[1],
          loading: false
        }))
      }
    })
  }

  render () {
    const { winner, loser, error, loading } = this.state
    if (loading) return <p>Loading ...</p>
    if (error) {
      return (
        <div>
          <p>{error}</p>
          <Link to="/battle">Reset</Link>
        </div>
      )
    }
    return <div><pre><code>{JSON.stringify(this.state, null, 2)}</code></pre></div>
  }
}

export default Results
