import React, { Component } from 'react'
import { Link } from 'react-router'
import NavbarInstance from './NavbarInstance'

export default class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div>
        <NavbarInstance />
        {children}
      </div>
    )
  }
}
