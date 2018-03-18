import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import queryString from 'query-string'

import PlayerPreview from './PlayerPreview'
import api from '../utils/api'

const Player = (props) => (
  <div>
    <h1 className="header">{props.label}</h1>
    <h3>Score: {props.score}</h3>
  </div>
)

Player.propTypes = {
  label: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  profile: PropTypes.object.isRequired
}

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
    return (
      <div>
        <Player label="Winner"
          score={winner.score}
          profile={winner.profile}
        />
          <Player label="Loser"
            score={loser.score}
            profile={loser.profile}
          />
      </div>
    )
  }
}

export default Results
