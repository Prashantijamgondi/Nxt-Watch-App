import {withRouter, Link} from 'react-router-dom'

import 'reactjs-popup/dist/index.css'

import {FaMoon} from 'react-icons/fa'
import {FiSun} from 'react-icons/fi'

import NxtwatchContext from '../../context/NxtwatchContext'
import Menubar from '../Menubar'
import Logout from '../Logout'

import {Div, Button, Profile} from './styledComponent'
import './index.css'

const Header = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {getBackGroundDark, activeLanguageLight} = value

      const logoUrl = activeLanguageLight
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

      // const colorCode = activeLanguageLight ? '' : '#f1f1f1'
      // const placeColor = activeLanguageLight ? '' : 'transparent'
      // const boxBackColor = activeLanguageLight ? '#f9f9f9' : '#0f0f0f'
      const containerBackColor = activeLanguageLight ? '' : '#313131'

      const theme = activeLanguageLight ? (
        <FaMoon style={{width: '25px', height: '20px', color: '#0f0f0f'}} />
      ) : (
        <FiSun style={{width: '25px', height: '20px', color: '#f8fafc'}} />
      )

      const changeTheme = () => {
        getBackGroundDark(activeLanguageLight)
      }

      return (
        <Div
          style={{
            backgroundColor: containerBackColor,
            paddingTop: '1vh',
            paddingBottom: '0.8vh',
          }}
        >
          <Link to="/">
            <img src={logoUrl} alt="nxt watch logo" className="img-logo" />
          </Link>
          <Div subContainer="true">
            <Button
              data-testid="theme"
              type="button"
              onClick={changeTheme}
              style={{backgroundColor: 'transparent'}}
            >
              {theme}
            </Button>
            <Profile
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
              alt="profile"
              className="profile-img"
            />
            <Menubar />
            <Logout />
          </Div>
        </Div>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default withRouter(Header)
