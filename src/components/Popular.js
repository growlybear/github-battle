import React, { Component } from 'react'
import PropTypes from 'prop-types'

import api from '../utils/api'

function SelectLanguage(props) {
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
  return (
    <ul className="languages">
      {
        languages.map((lang) => (
          <li
            key={ lang }
            style={ lang === props.selectedLanguage ? { color: '#d0021b' } : null }
            onClick={ props.onSelect.bind(null, lang) }
          >
            { lang }
          </li>
        ))
      }
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

class Popular extends Component {
  constructor (props) {
    super()
    this.state = {
      selected: 'All',
      repos: null
    }
    this.select = this.select.bind(this)
  }

  select (lang) {
    this.setState(() => ({ selected: lang }))
    api.fetchPopularLanguages(lang)
      .then(repos => this.setState({ repos }))
  }

  componentDidMount () {
    this.select(this.state.selected)
  }

  render () {
    return (
      <SelectLanguage
        selectedLanguage={this.state.selected}
        onSelect={this.select} />
    )
  }
}

export default Popular
