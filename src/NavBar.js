import React, { Component } from 'react'

export default class NavBar extends Component {
  render() {
    let props = this.props

    let style = {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      paddingLeft: 15,
      paddingRight: 15,
      paddingTop: 15,
      background: '#111'
    }

    let navLinks = Object.keys(props.pages).map(function(page) {
      return (
        <NavLink active={page === props.activePage} updatePage={props.updatePage} pageName={page}>
          {page} {page === props.activePage && '(' + props.pages[page].limit + ')'}
        </NavLink>
      )
    })

    return (
      <div style={style}>
        {navLinks}
      </div>
    )
  }
}

class NavLink extends React.Component {
  render() {
    let updatePage = this.props.updatePage
    let pageName = this.props.pageName

    let style = {
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: 15,
      color: '#bbb',
      textDecoration: 'none',
      display: 'inline-block',
      padding: '15px 15px 8px 15px',
      cursor: 'pointer'
    }

    let activeStyle = {
      borderBottom: '3px solid rgb(229,214,40)',
      color: 'white'
    }

    if (this.props.active) Object.assign(style, activeStyle)

    return (
      <a style={style} onClick={() => {updatePage(pageName)}}>{this.props.children}</a>
    )
  }
}
