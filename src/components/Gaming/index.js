import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'

import SideBody from '../SideBody'
import Header from '../Header'
import NxtwatchContext from '../../context/NxtwatchContext'

import './index.css'
import {OneBody, Round, FailureContainer, RetryButton} from './styledComponent'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Gaming extends Component {
  state = {apiStatus: apiStatusConstant.initial, gamingVideosList: []}

  componentDidMount() {
    this.getGamingVideos()
  }

  getGamingVideos = async () => {
    this.setState({apiStatus: apiStatusConstant.progress})
    const apiUrl = 'https://apis.ccbp.in/videos/gaming'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const responseData = await response.json()
      const {videos} = responseData
      const gamingVideosList = videos.map(eachVideo => ({
        id: eachVideo.id,
        title: eachVideo.title,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({gamingVideosList, apiStatus: apiStatusConstant.success})
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  getSuccessDetails = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {activeLanguageLight} = value
        const {gamingVideosList} = this.state

        const trendingHeadingBackgroundColor = activeLanguageLight
          ? '#ebebeb'
          : '#231f20'
        const trendingBackgroundColor = activeLanguageLight
          ? '#f9f9f9'
          : '#0f0f0f'
        const roundBackcolor = activeLanguageLight ? '#d7dfe9' : '#000000'
        const trendingHeading = activeLanguageLight ? '#1e293b' : '#f9f9f9'
        const gameHeadingColor = activeLanguageLight ? '#1e293b' : '#f9f9f9'

        return (
          <div
            style={{
              backgroundColor: trendingBackgroundColor,
              overflowY: 'scroll',
              scrollbarWidth: 'none',
              height: '100vh',
            }}
          >
            <div
              className="trending-heading-container"
              style={{backgroundColor: trendingHeadingBackgroundColor}}
            >
              <Round style={{backgroundColor: roundBackcolor}}>
                <FaFire style={{color: 'red', width: '30px', height: '30px'}} />
              </Round>
              <h1 style={{marginLeft: '10px', color: trendingHeading}}>
                Gaming
              </h1>
            </div>
            <div style={{color: trendingHeading}} className="gaming-videos">
              {gamingVideosList.map(eachVideoItem => (
                <li key={eachVideoItem.id}>
                  <Link
                    to={`/videos/${eachVideoItem.id}`}
                    style={{textDecoration: 'none', color: '#1e293b'}}
                  >
                    <div className="gaming-video-card">
                      <img
                        src={eachVideoItem.thumbnailUrl}
                        alt="video thumbnail"
                        className="game-video-thumbnail"
                      />
                      <h1
                        style={{
                          fontSize: '21px',
                          margin: '1px',
                          color: gameHeadingColor,
                        }}
                        className="gaming-heading"
                      >
                        {eachVideoItem.title}
                      </h1>
                      <p
                        style={{
                          margin: '3px',
                          color: '#616e7c',
                        }}
                      >
                        {eachVideoItem.viewCount}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </div>
          </div>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  retryOnce = () => this.getTrendingVideos()

  getFailureDetails = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {activeLanguageLight} = value
        const backcolor = activeLanguageLight ? '' : '#000000'
        const color = activeLanguageLight ? '' : '#ebebeb'
        return (
          <FailureContainer
            className="failure"
            style={{backgroundColor: backcolor}}
          >
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png"
              alt=""
              className="img-values"
            />
            <h1 style={{color}}>Oops! Something Went Wrong</h1>
            <p style={{color}}>
              We are having some trouble to complete your request.
            </p>
            <p style={{color}}>Please try again.</p>
            <RetryButton onClick={this.retryOnce}>Retry</RetryButton>
          </FailureContainer>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  getProgressDetails = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {activeLanguageLight} = value
        const backcolor = activeLanguageLight ? '' : '#000000'
        return (
          <div
            data-testid="loader"
            style={{backgroundColor: backcolor}}
            className="loading-container"
          >
            <Loader
              type="ThreeDots"
              color="darkblue"
              height="100"
              width="100"
            />
          </div>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  statusReturn = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.getSuccessDetails()
      case apiStatusConstant.failure:
        return this.getFailureDetails()
      case apiStatusConstant.progress:
        return this.getProgressDetails()
      default:
        return null
    }
  }

  render() {
    return (
      <div data-testid="gaming">
        <Header />
        <OneBody>
          <SideBody />
          <>{this.statusReturn()}</>
        </OneBody>
      </div>
    )
  }
}

export default Gaming
