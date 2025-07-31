import {Link} from 'react-router-dom'

import {IoMdHome} from 'react-icons/io'
import {FaFirefoxBrowser} from 'react-icons/fa'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddLine} from 'react-icons/ri'

import NxtwatchContext from '../../context/NxtwatchContext'
import './index.css'

import {
  SideColumn,
  TopSideColumn,
  BottomSideColumn,
  Div,
  ContactMedia,
  Para,
  Image,
} from './styledComponent'

const SideBody = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {activeTab, activeTabClick, activeLanguageLight} = value

      const atHome = () => activeTabClick('home')
      const atTrend = () => activeTabClick('trend')
      const atGaming = () => activeTabClick('game')
      const atSaved = () => activeTabClick('saved')

      const backgroundcolor = activeLanguageLight ? '' : '#313131'
      const fontColor = activeLanguageLight
        ? 'white-theme-color'
        : 'dark-theme-color'

      const normalBackgroundColor = activeLanguageLight ? '#d7dfe9' : ' #606060'
      const iconColor = activeLanguageLight ? '#313131' : '#ffffff'

      return (
        <div
          className="sidebar-container"
          style={{backgroundColor: backgroundcolor}}
        >
          <SideColumn>
            <TopSideColumn>
              <Div
                style={
                  activeTab === 'home'
                    ? {
                        color: '#ff0000',
                        backgroundColor: normalBackgroundColor,
                        fontWeight: 'bold',
                      }
                    : {
                        color: iconColor,
                      }
                }
                className={`link-container ${normalBackgroundColor}`}
              >
                <IoMdHome className="icon" style={{iconColor}} />
                <Link
                  to="/"
                  onClick={atHome}
                  className={`link-name ${fontColor}`}
                >
                  Home
                </Link>
              </Div>
              <Div
                style={
                  activeTab === 'trend'
                    ? {
                        color: '#ff0000',
                        backgroundColor: normalBackgroundColor,
                        fontWeight: 'bold',
                      }
                    : {
                        color: iconColor,
                      }
                }
                className={`link-container ${normalBackgroundColor}`}
              >
                <FaFirefoxBrowser className="icon" />
                <Link
                  to="/trending"
                  onClick={atTrend}
                  className={`link-name ${fontColor}`}
                >
                  Trending
                </Link>
              </Div>
              <Div
                style={
                  activeTab === 'game'
                    ? {
                        color: '#ff0000',
                        backgroundColor: normalBackgroundColor,
                        fontWeight: 'bold',
                      }
                    : {
                        color: iconColor,
                      }
                }
                className={`link-container ${normalBackgroundColor}`}
              >
                <SiYoutubegaming className="icon" />
                <Link
                  to="/gaming"
                  onClick={atGaming}
                  className={`link-name ${fontColor}`}
                >
                  Gaming
                </Link>
              </Div>
              <Div
                style={
                  activeTab === 'saved'
                    ? {
                        color: '#ff0000',
                        backgroundColor: normalBackgroundColor,
                        fontWeight: 'bold',
                      }
                    : {
                        color: iconColor,
                      }
                }
                className={`link-container ${normalBackgroundColor}`}
              >
                <RiMenuAddLine className="icon" />
                <Link
                  to="/saved-videos"
                  onClick={atSaved}
                  className={`link-name ${fontColor}`}
                >
                  Saved videos
                </Link>
              </Div>
            </TopSideColumn>
            <BottomSideColumn className={fontColor}>
              <Para>CONTACT US</Para>
              <ContactMedia>
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                  alt="facebook logo"
                />
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                  alt="twitter logo"
                />
                <Image
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                  alt="linked logo"
                />
              </ContactMedia>
              <Para>Enjoy! Now to see your channels and recommendations!</Para>
            </BottomSideColumn>
          </SideColumn>
        </div>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default SideBody
