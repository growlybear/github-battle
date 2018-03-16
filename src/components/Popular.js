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

function RepoGrid(props) {
  return (
    <ul className="popular-list">
      {
        props.repos.map((repo, index) => (
          <li key={repo.name} className="popular-item">
            <div className="popular-rank">#{index + 1}</div>
            <ul className="space-list-items">
              <li>
                <img className="avatar"
                  src={repo.owner.avatar_url}
                  alt={`Avatar for ${repo.owner.login}`}
                />
              </li>
              <li><a href={repo.html_url}>{repo.name}</a></li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        ))
      }
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'All',
      repos: null
    }
    this.select = this.select.bind(this)
  }

  select (lang) {
    this.setState(() => ({
      selected: lang,
      repos: null
    }))
    // TODO no error handling yet
    api.fetchPopularLanguages(lang)
      .then(repos => this.setState({ repos }))
  }

  componentDidMount () {
    this.select(this.state.selected)
  }

  render () {
    return (
      <div>
        <SelectLanguage
          selectedLanguage={this.state.selected}
          onSelect={this.select} />

        { this.state.repos
            ? <RepoGrid repos={this.state.repos} />
            : <p>Loading ...</p>
        }
      </div>
    )
  }
}

export default Popular
