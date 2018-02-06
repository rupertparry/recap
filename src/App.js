import React, { Component } from 'react';
import NavBar from './NavBar'
import EntryForm from './EntryForm'
import './App.css';

class AddButton extends Component {
  render() {
    let style = {
      position: 'fixed',
      fontFamily: 'Roboto',
      bottom: '40px',
      right: '40px',
      background: 'rgb(229,214,40)',
      borderRadius: '50%',
      width: 60,
      height: '60px',
      fontSize: 50,
      lineHeight: '60px',
      color: 'white',
      textShadow: '0 2px 30px #ba971a',
      cursor: 'pointer',
      border: 0
    }

    let updatePage = this.props.updatePage

    return(
      <button style={style} onClick={this.props.toggle}><div style={{position: 'relative', bottom: '1px'}}>+</div></button>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)

    let pages = {
      Articles: {
        limit: 10
      },
      Videos: {
        limit: 5
      },
      Audio: {
        limit: 5
      }
    }

    this.emptyItems = {
      Articles: [],
      Videos: [],
      Audio: []
    }

    let storageItems = JSON.parse(localStorage.getItem('items'))

    this.state = {
      'pages': pages,
      items: storageItems ? storageItems : this.emptyItems,
      activePage: 'Articles',
      entryFormModal: false
    }

    this.updatePage = this.updatePage.bind(this)
    this.toggleEntryFormModal = this.toggleEntryFormModal.bind(this)
    this.addItem = this.addItem.bind(this)
    this.deleteItem = this.deleteItem.bind(this)
  }

  updatePage(newPage) {
    this.setState({activePage: newPage})
  }

  toggleEntryFormModal() {
    let current = this.state.entryFormModal
    this.setState({entryFormModal: !current})
  }

  addItem(newItem) {
    return new Promise((resolve, reject) => {
      let items = this.state.items ? this.state.items : []

      if (items[newItem['type']].length < this.state.pages[newItem['type']].limit) {
        items[newItem['type']].push({title: newItem['title'], url: newItem['url']})
        this.setState({
          items: items
        })
        localStorage.setItem('items', JSON.stringify(items))
        resolve()
      } else {
        reject('full')
      }
    })
  }

  deleteItem(itemIndex, itemType) {
    let items = this.state.items
    items[itemType].splice(itemIndex, 1)

    this.setState({
      items: items
    })
    localStorage.setItem('items', JSON.stringify(items))
  }

  render() {
    console.log(this.state)
    return (
      <div className="App" style={{paddingBottom: 120, paddingTop: 60}}>
        <NavBar pages={this.state.pages}
          activePage={this.state.activePage}
          updatePage={this.updatePage} />
        <EntryForm enabled={this.state.entryFormModal}
          activePage={this.state.activePage}
          toggle={this.toggleEntryFormModal}
          addItem={this.addItem} />
        <ItemsView items={this.state.items}
          type={this.state.activePage}
          deleteItem={this.deleteItem} />
        <AddButton toggle={this.toggleEntryFormModal} />
      </div>
    );
  }
}

class ItemsView extends Component {
  render() {
    let listStyle = {
      listStyle: 'none'
    }

    let listItemStyle = {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }

    let linkStyle = {
      color: 'white',
      textDecoration: 'none',
      fontFamily: 'Bitter',
      fontWeight: 700,
      fontSize: 21,
      maxWidth: '86%',
      display: 'block',
      marginTop: 10,
      marginBottom: 10
    }

    let crossStyle = {
      cursor: 'pointer',
      fontFamily: 'Roboto',
      fontWeight: 500,
      fontSize: 25,
      marginRight: 25,
      paddingLeft: 20
    }

    let itemsList = this.props.items[this.props.type] && this.props.items[this.props.type].map((item, i) => {
      return(
        <li style={listItemStyle} key={i}>
          <a style={linkStyle} href={item.url} target="_blank">{item.title}</a>
          <div style={crossStyle} onClick={() => {this.props.deleteItem(i, this.props.type)}}>&#215;</div>
        </li>
      )
    })

    return (
      <ul style={listStyle}>{itemsList}</ul>
    )
  }
}

export default App;
