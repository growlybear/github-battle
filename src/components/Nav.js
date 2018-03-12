import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export default () => (
  <ul className="nav">
    <li>
      <NavLink exact activeClassName="current" to="/" >
        Home
      </NavLink>
    </li>
    <li>
      <NavLink exact activeClassName="current" to="/battle">
        Battle
      </NavLink>
    </li>
    <li>
      <NavLink exact activeClassName="current" to="/popular">
        Popular
      </NavLink>
    </li>
  </ul>
)
