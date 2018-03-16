import React, { Component } from 'react'
import PropTypes from 'prop-types'

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
        <button type="submit" disabled={!this.state.username}>
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
  }

  handleSubmit (id, username) {
    const num = id === 0 ? 'One' : 'Two'
    const player = `player${num}`

    let newState = {
      [player]: {}
    }
    newState[player].username = username
    newState[player].image = `https://github.com/${username}.png?size=200`

    this.setState(newState)
  }

  render () {
    const playerOneName = this.state.playerOne.username
    const playerTwoName = this.state.playerTwo.username
    return (
      <div>
        <div className="row">
          { !playerOneName &&
              <PlayerInput
                id={0}
                label="Player One"
                onSubmit={this.handleSubmit}
              />
          }
          { !playerTwoName &&
              <PlayerInput
                id={1}
                label="Player Two"
                onSubmit={this.handleSubmit}
              />}
        </div>
      </div>
    )
  }
}

export default Battle
