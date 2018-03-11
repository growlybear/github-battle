import React, { Component } from 'react'

class Popular extends Component {
  render () {
    var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python']
    return (
      <ul className="languages">
        {
          languages.map((language) => <li key={language}>{ language }</li>)
        }
      </ul>
    )
  }
}

export default Popular
