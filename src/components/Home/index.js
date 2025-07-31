import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {FaSearch} from 'react-icons/fa'

import SideBody from '../SideBody'
import './index.css'

import {OneBody, Body, SearchContainer, Button} from './styledComponent'

import NxtwatchContext from '../../context/NxtwatchContext'
import Header from '../Header'
import VideosListItem from '../VideosListItem'
import PopupContainer from '../PopupContainer'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class Home extends Component {
  state = {
    videosList: [],
    apiStatus: apiStatusConstant.initial,
    search: '',
  }

  componentDidMount() {
    this.getAllVideoDetails()
  }

  getAllVideoDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.progress})
    const {search} = this.state
    const jwtToken = Cookies.get('jwt_token')
    let apiUrl = 'https://apis.ccbp.in/videos/all'
    if (search !== undefined) {
      apiUrl = `https://apis.ccbp.in/videos/all?search=${search}`
    }
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const responseData = await response.json()
      const {videos} = responseData
      const videosData = videos.map(eachData => ({
        id: eachData.id,
        title: eachData.title,
        publishedAt: eachData.published_at,
        thumbnailUrl: eachData.thumbnail_url,
        viewCount: eachData.view_count,
        channel: {
          name: eachData.channel.name,
          profileImageUrl: eachData.channel.profile_image_url,
        },
      }))
      this.setState({
        apiStatus: apiStatusConstant.success,
        videosList: videosData,
      })
    } else this.setState({apiStatus: apiStatusConstant.failure})
  }

  enterSearch = event => {
    this.setState({search: event.target.value})
    if (event.key === 'Enter') {
      this.getAllVideoDetails()
    }
  }

  retry = () => this.getAllVideoDetails()

  search = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {activeLanguageLight} = value

        return (
          <SearchContainer>
            <input
              type="search"
              className="search-input"
              placeholder="Search"
              onKeyDown={this.enterSearch}
              style={
                activeLanguageLight
                  ? {}
                  : {
                      backgroundColor: 'transparent',
                      border: 'solid',
                      borderColor: '#606060',
                      color: '#ffffff',
                      borderWidth: '2px',
                    }
              }
            />
            <FaSearch
              data-testid="searchButton"
              className="search-icon"
              style={
                activeLanguageLight
                  ? {}
                  : {
                      backgroundColor: '#606060',
                      border: 'solid',
                      borderColor: '#606060',
                      borderWidth: '2px',
                    }
              }
              onClick={() => this.getAllVideoDetails()}
            />
          </SearchContainer>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  printSuccessView = () => {
    const {videosList} = this.state

    return (
      <div className="success-container">
        <div className="videos-list-container">
          {videosList.length === 0 ? (
            <div className="failure-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
                alt="no videos"
                style={{width: '35vw', height: '40vh'}}
              />
              <h1 style={{color: '#1e293b'}}>No Search results Found</h1>
              <p>Try different key words or remove search filter</p>
              <Button type="button" onClick={this.retry}>
                Retry
              </Button>
            </div>
          ) : (
            videosList.map(eachVideoItem => (
              <li key={eachVideoItem.id}>
                <VideosListItem eachVideoItem={eachVideoItem} />
              </li>
            ))
          )}
        </div>
      </div>
    )
  }

  printProgresView = () => (
    <div data-testid="loader" className="loading-container">
      <Loader type="ThreeDots" color="darkblue" height="100" width="100" />
    </div>
  )

  printFailureView = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {isDarkTheme} = value

        const logoUrl = isDarkTheme
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

        return (
          <div className="failure-container">
            <img
              src={logoUrl}
              alt="failure-view"
              style={{width: '30vw', height: '40vh'}}
            />
            <h1 style={{color: '#1e293b'}}>Oops! Something Went Wrong</h1>
            <p>We are playing some trouble to complete your request.</p>
            <p>Please try again.</p>
            <Button type="button" onClick={this.retry}>
              Retry
            </Button>
          </div>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  homeBodyContainer = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.printSuccessView()
      case apiStatusConstant.failure:
        return this.printFailureView()
      case apiStatusConstant.progress:
        return this.printProgresView()
      default:
        return null
    }
  }

  render() {
    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {activeLanguageLight} = value
          const backColor = activeLanguageLight ? '#f9f9f9 ' : '#181818'

          return (
            <div data-testid="home">
              <Header />
              <OneBody id="divs">
                <SideBody />
                <Body style={{backgroundColor: backColor}}>
                  <PopupContainer />
                  <>
                    {this.search()}
                    {this.homeBodyContainer()}
                  </>
                </Body>
              </OneBody>
            </div>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }
}

export default Home
