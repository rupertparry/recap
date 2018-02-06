import React, { Component } from 'react'
import Select from 'react-select'
import 'react-select/dist/react-select.css';

export default class EntryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      title: '',
      url: '',
      type: 'Articles'
    }

    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleUrlChange = this.handleUrlChange.bind(this)
    this.handleTypeChange = this.handleTypeChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggle = this.toggle.bind(this)
  }

  componentWillReceiveProps() {
    this.setState({
      type: this.props.activePage
    })
  }

  handleTitleChange(event) {
    this.setState({title: event.target.value})
  }

  handleUrlChange(event) {
    this.setState({url: event.target.value})
  }

  handleTypeChange(type) {
    this.setState({type: type.value})
    console.log(this.state)
  }

  toggle() {
    this.setState({
      fullWarning: false,
      title: '',
      url: '',
      type: 'Articles'
    })

    this.props.toggle()
  }

  handleSubmit(event) {
    event.preventDefault()

    this.props.addItem(this.state)
      .then(() => {
        this.toggle()
      }).catch((err) => {
        if (err === 'full') {
          this.setState({
            fullWarning: 'true'
          })
        }
      })
  }

  render() {
    let overlayStyle = {
      position: 'fixed',
      background: 'rgba(0,0,0,0.5)',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1
    }

    let boxStyle = {
      background: '#222',
      color: 'white',
      position: 'fixed',
      zIndex: 2,
      height: 290,
      padding: '50px',
      top: '10%',
      left: '5%',
      right: '5%'
    }

    let labelStyle = {
      fontFamily: 'Roboto',
      display: 'block',
      marginBottom: 5
    }

    let inputStyle = {
      fontFamily: 'Roboto',
      color: 'white',
      fontSize: '16px',
      lineHeight: '20px',
      padding: '10px 10px',
      display: 'block',
      width: '100%',
      background: '#444',
      border: 'none',
      boxSizing: 'border-box',
      marginBottom: 20
    }

    let buttonDivStyle = {
      marginTop: 20,
      float: 'right'
    }

    let buttonStyle = {
      background: '#888',
      fontFamily: 'Roboto',
      fontSize: 18,
      color: 'white',
      marginLeft: 10,
      padding: '5px 15px',
      border: 0,
      WebkitAppearance: 'none'
    }

    let activeButtonStyle = Object.assign({}, buttonStyle, {
      background: 'rgb(229,214,40)',
      color: 'black'
    })

    let warningStyle = {
      marginTop: 15
    }

    if (this.props.enabled) {
      return (
        <div>
          <div style={boxStyle}>
            <form onSubmit={this.handleSubmit}>
              <label style={labelStyle}>Title</label>
              <input autofocus style={inputStyle} value={this.state.title} onChange={this.handleTitleChange}></input>
              <label style={labelStyle}>URL</label>
              <input style={inputStyle} value={this.state.url} onChange={this.handleUrlChange}></input>
              <Select value={this.state.type} onChange={this.handleTypeChange}
                searchable={false} clearable={false}
                options={[
                  {value: 'Articles', label: 'Article'},
                  {value: 'Audio', label: 'Audio'},
                  {value: 'Videos', label: 'Videos'},
                ]} />
              { this.state.fullWarning && <div style={warningStyle}>You're at your limit! Delete something and try again.</div>}
              <div style={buttonDivStyle}>
                <button style={buttonStyle} onClick={this.toggle}>Cancel</button>
                <input style={activeButtonStyle} type="submit" value="Add"></input>
              </div>
            </form>
          </div>
          <div style={overlayStyle} onClick={this.toggle}>
          </div>
        </div>
      )
    } else {
      return false
    }
  }
}
