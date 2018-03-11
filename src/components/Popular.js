import React, { Component } from 'react'

class Popular extends Component {
  constructor (props) {
    super(props)
    this.state = {
      selected: 'All'
    }
    this.select = this.select.bind(this)
  }

  select (lang) {
    this.setState(() => ({ selected: lang }))
  }

  render () {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
      <ul className="languages">
        {
          languages.map((lang) => (
            <li
              key={ lang }
              style={ lang === this.state.selected ? { color: '#d0021b' } : null }
              onClick={ this.select.bind(null, lang) }
            >
              { lang }
            </li>
          ))
        }
      </ul>
    )
  }
}

export default Popular
