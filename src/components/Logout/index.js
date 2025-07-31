import Popup from 'reactjs-popup'
import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import 'reactjs-popup/dist/index.css'

import {FiLogOut} from 'react-icons/fi'

import './index.css'

import NxtwatchContext from '../../context/NxtwatchContext'

const Logout = ({history}) => (
  <NxtwatchContext.Consumer>
    {value => {
      const {activeLanguageLight} = value
      const onLogout = () => {
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      return (
        <Popup
          modal
          trigger={
            <div>
              <button type="button" className="logout-in-large">
                Logout
              </button>
              <button
                type="button"
                className="mbl-device-logout-btn"
                style={
                  activeLanguageLight ? {color: '#0f0f0f'} : {color: '#f8fafc'}
                }
              >
                <FiLogOut
                  style={{width: '5vw', height: '5vh', cursor: 'pointer'}}
                />
              </button>
            </div>
          }
          closeOnDocumentClick
          className="logout-popup"
        >
          {close => (
            <div className="popup-box">
              <p>Are you sure you want to logout?</p>
              <div className="popup-actions">
                <button
                  className="confirm-btn"
                  onClick={() => {
                    onLogout()
                    close()
                  }}
                  type="button"
                >
                  Yes
                </button>
                <button className="cancel-btn" onClick={close} type="button">
                  No
                </button>
              </div>
            </div>
          )}
        </Popup>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default withRouter(Logout)
