import {Component} from 'react'
import Cookies from 'js-cookie'
import {FaFire} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import SideBody from '../SideBody'
import Header from '../Header'
import VideoCard from '../VideoCard'
import NxtwatchContext from '../../context/NxtwatchContext'

import './index.css'

import {OneBody, FailureContainer, Round, RetryButton} from './styledComponent'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Trending extends Component {
  state = {apiStatus: apiStatusConstant.initial, trendingVideosList: []}

  componentDidMount() {
    this.getTrendingVideos()
  }

  getTrendingVideos = async () => {
    this.setState({apiStatus: apiStatusConstant.progress})
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
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
      const trendingVideosList = videos.map(eachVideo => ({
        channel: {
          name: eachVideo.channel.name,
          profileImgUrl: eachVideo.channel.profile_image_url,
        },
        id: eachVideo.id,
        title: eachVideo.title,
        publishedAt: eachVideo.published_at,
        thumbnailUrl: eachVideo.thumbnail_url,
        viewCount: eachVideo.view_count,
      }))
      this.setState({trendingVideosList, apiStatus: apiStatusConstant.success})
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  getSuccessDetails = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {activeLanguageLight} = value
        const {trendingVideosList} = this.state

        const trendingHeadingBackgroundColor = activeLanguageLight
          ? '#ebebeb'
          : '#231f20'
        const trendingBackgroundColor = activeLanguageLight
          ? '#f9f9f9'
          : '#0f0f0f'
        const roundBackcolor = activeLanguageLight ? '#d7dfe9' : '#000000'
        const trendingHeading = activeLanguageLight ? '#1e293b' : '#f9f9f9'
  
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
              <h1
                style={{marginLeft: '10px', color: trendingHeading}}
                className="trending-heading"
              >
                Trending
              </h1>
            </div>
            <div>
              {trendingVideosList.map(eachVideoItem => (
                <li key={eachVideoItem.id}>
                  <VideoCard eachVideoItem={eachVideoItem} />
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
      <div data-testid="trending">
        <Header />
        <OneBody>
          <SideBody />
          <>{this.statusReturn()}</>
        </OneBody>
      </div>
    )
  }
}

export default Trending
