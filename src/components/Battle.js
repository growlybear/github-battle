import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import PlayerPreview from './PlayerPreview'

class PlayerInput extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (event) {
    var value = event.target.value
    this.setState({ username: value })
  }

  handleSubmit (event) {
    event.preventDefault()
    this.props.onSubmit(
      this.props.id,
      this.state.username
    )
  }

  render () {
    return (
      <form className="column" onSubmit={this.handleSubmit}>
        <label className="header" htmlFor="username">
          {this.props.label}
        </label>
        <input type="text"
          id="username"
          placeholder="github username"
          autoComplete="off"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button type="submit"
          disabled={!this.state.username}
          className="button"
        >
          Submit
        </button>
      </form>
    )
  }
}

PlayerInput.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

class Battle extends Component {
  constructor (props) {
    super(props)
    this.state = {
      playerOne: {
        username: '',
        image: null,
      },
      playerTwo: {
        username: '',
        image: null,
      },
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  handleSubmit (id, username) {
    const num = id === 1 ? 'One' : 'Two'
    const player = `player${num}`

    let newState = {
      [player]: {}
    }
    newState[player].username = username
    newState[player].image = `https://github.com/${username}.png?size=200`

    this.setState(newState)
  }

  handleReset (id) {
    const num = id === 1 ? 'One' : 'Two'
    const player = `player${num}`

    let newState = {
      [player]: {}
    }
    newState[player].username = ''
    newState[player].image = null

    this.setState(Object.assign(this.state, newState))
  }

  render () {
    const match = this.props.match

    const playerOneName = this.state.playerOne.username
    const playerTwoName = this.state.playerTwo.username
    const playerOneImage = this.state.playerOne.image
    const playerTwoImage = this.state.playerTwo.image

    return (
      <div>
        <div className="row">
          { !playerOneName &&
              <PlayerInput
                id={1}
                label="Player One"
                onSubmit={this.handleSubmit}
              />
          }
          { playerOneName &&
              <PlayerPreview
                avatar={playerOneImage}
                username={playerOneName}
              >
                <button className="reset"
                  onClick={this.handleReset.bind(null, 1)}
                >
                  Reset
                </button>
              </PlayerPreview>
          }
          { !playerTwoName &&
              <PlayerInput
                id={2}
                label="Player Two"
                onSubmit={this.handleSubmit}
              />
          }
          { playerTwoName &&
              <PlayerPreview
                avatar={playerTwoImage}
                username={playerTwoName}
              >
                <button className="reset"
                  onClick={this.handleReset.bind(null, 2)}
                >
                  Reset
                </button>
              </PlayerPreview>
          }
        </div>

        { playerOneName && playerTwoName &&
            <Link to={{
              pathname: `${match.url}/results`,
              search: `playerOneName=${playerOneName}&playerTwoName=${playerTwoName}`
            }} className="button">
              Battle!
            </Link>
        }

      </div>
    )
  }
}

export default Battle
