import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {Container, Box, Div, Button, ShowpasswordDiv} from './styledComponent'

import NxtwatchContext from '../../context/NxtwatchContext'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrormsg: false,
    errorMsg: '',
    isShowPassword: false,
  }

  updateUsername = event => {
    this.setState({username: event.target.value})
  }

  updatPassword = event => {
    this.setState({password: event.target.value})
  }

  toggleShowPassword = () => {
    this.setState(prevState => ({isShowPassword: !prevState.isShowPassword}))
  }

  onSuccessResponse = jwt => {
    const {history} = this.props
    Cookies.set('jwt_token', jwt, {
      expires: 5,
      path: '/',
    })
    history.replace('/')
  }

  onFailureResponse = errorMsg => {
    this.setState({showErrormsg: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const api = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(api, options)
    const responseData = await response.json()
    if (response.ok === true) {
      this.onSuccessResponse(responseData.jwt_token)
    } else {
      this.onFailureResponse("*Username and Password didn't match")
    }
  }

  render() {
    const {showErrormsg, errorMsg, isShowPassword} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {activeLanguageLight} = value

          const logoUrl = activeLanguageLight
            ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

          const colorCode = activeLanguageLight ? '' : '#f1f1f1'
          const placeColor = activeLanguageLight ? '' : 'transparent'
          const containerBackColor = activeLanguageLight ? '#f1f1f1' : '#212121'
          const boxBackColor = activeLanguageLight ? '#f9f9f9' : '#0f0f0f'

          return (
            <Container style={{backgroundColor: containerBackColor}}>
              <Box className="box" style={{backgroundColor: boxBackColor}}>
                <img
                  src={logoUrl}
                  alt="nxt-watch-logo"
                  className="nxt-watch-logo"
                />
                <form onSubmit={this.submitForm}>
                  <Div>
                    <label
                      htmlFor="username"
                      style={{color: colorCode}}
                      className="label-login"
                    >
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      placeholder="Username"
                      className="input"
                      style={{backgroundColor: placeColor}}
                      onChange={this.updateUsername}
                    />
                  </Div>
                  <Div>
                    <label
                      htmlFor="password"
                      style={{color: colorCode}}
                      className="label-login"
                    >
                      PASSWORD
                    </label>
                    <input
                      type={isShowPassword ? 'text' : 'password'}
                      id="password"
                      className="input"
                      placeholder="Password"
                      style={{backgroundColor: placeColor}}
                      onChange={this.updatPassword}
                    />
                  </Div>
                  <ShowpasswordDiv className="label-login">
                    <input
                      type="checkbox"
                      id="checkbox"
                      onChange={this.toggleShowPassword}
                    />
                    <label htmlFor="checkbox" style={{color: colorCode}}>
                      Show Password
                    </label>
                  </ShowpasswordDiv>
                  <div>
                    <Button type="submit" className="btn">
                      Login
                    </Button>
                  </div>
                </form>
                {showErrormsg ? <p className="error">{errorMsg}</p> : ''}
              </Box>
            </Container>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default Login
