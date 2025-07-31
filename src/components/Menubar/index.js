import {Component} from 'react'
import {Link} from 'react-router-dom'

import {IoMenu} from 'react-icons/io5'

import NxtwatchContext from '../../context/NxtwatchContext'
import './index.css'

class Menubar extends Component {
  state = {open: false}

  toggleMenu = () => {
    const {open} = this.state
    this.setState({open: !open})
  }

  render() {
    const {open} = this.state
    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {activeTab, activeTabClick, activeLanguageLight} = value

          const atHome = () => activeTabClick('home')
          const atTrend = () => activeTabClick('trend')
          const atGaming = () => activeTabClick('game')
          const atSaved = () => activeTabClick('saved')

          return (
            <div className="menu-container">
              <button
                className="hamburger"
                onClick={this.toggleMenu}
                type="button"
                style={
                  activeLanguageLight ? {color: '#0f0f0f'} : {color: '#f8fafc'}
                }
              >
                <IoMenu style={{width: '6vw', height: '6vh'}} />
              </button>

              {open && (
                <ul className="menu-list">
                  <li
                    style={
                      activeTab === 'home' ? {backgroundColor: '#f5f5f5'} : {}
                    }
                  >
                    <Link to="/" onClick={atHome} className="link-name">
                      Home
                    </Link>
                  </li>
                  <li
                    style={
                      activeTab === 'trend' ? {backgroundColor: '#f5f5f5'} : {}
                    }
                  >
                    <Link
                      to="/trending"
                      onClick={atTrend}
                      className="link-name"
                    >
                      Trending
                    </Link>
                  </li>
                  <li
                    style={
                      activeTab === 'game' ? {backgroundColor: '#f5f5f5'} : {}
                    }
                  >
                    <Link to="/gaming" onClick={atGaming} className="link-name">
                      Gaming
                    </Link>
                  </li>
                  <li
                    style={
                      activeTab === 'saved' ? {backgroundColor: '#f5f5f5'} : {}
                    }
                  >
                    <Link
                      to="/saved-videos"
                      onClick={atSaved}
                      className="link-name"
                    >
                      Saved videos
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default Menubar
