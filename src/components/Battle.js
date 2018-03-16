import React, { Component } from 'react'
import PropTypes from 'prop-types'

const PlayerPreview = (props) => (
  <div>
    <div className="column">
      <img className="avatar"
        src={props.avatar}
        alt={"Avatar for " + props.avatar}
      />
      <h2 className="username">@{props.username}</h2>
    </div>
    <button className="reset"
      onClick={props.onReset.bind(null, props.id)}
    >
      Reset
    </button>
  </div>
)

PlayerPreview.propTypes = {
  avatar: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  onReset: PropTypes.func.isRequired
}

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
    const playerOneName = this.state.playerOne.username
    const playerTwoName = this.state.playerTwo.username
    const playerOneImage = this.state.playerOne.image
    const playerTwoImage = this.state.playerTwo.image

    console.log('yo', playerOneName)
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
                id={1}
                avatar={playerOneImage}
                username={playerOneName}
                onReset={this.handleReset}
              />
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
                id={2}
                avatar={playerTwoImage}
                username={playerTwoName}
                onReset={this.handleReset}
              />
          }
        </div>
      </div>
    )
  }
}

export default Battle
