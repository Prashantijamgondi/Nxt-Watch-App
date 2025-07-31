import {Route, Switch} from 'react-router-dom'
import {Component} from 'react'

import Home from './components/Home'
import Login from './components/Login'
import NxtwatchContext from './context/NxtwatchContext'
import ProtectedRoute from './components/ProtectedRoute'
import VideoItemsDetails from './components/VideoItemsDetails'
import SavedVideos from './components/SavedVideos'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import NotFound from './components/NotFound'

import './App.css'

class App extends Component {
  state = {
    activeLanguageLight: true,
    activeTab: 'home',
    savedVideosList: [],
    likedVideosList: [],
    disLikedVideosList: [],
  }

  getActiveTab = props => {
    this.setState({activeTab: props})
  }

  getBackGroundDark = activeLanguageLight =>
    this.setState({activeLanguageLight: !activeLanguageLight})

  getSaveVideo = savedVideo => {
    this.setState(prev => ({
      savedVideosList: [...prev.savedVideosList, savedVideo],
    }))
  }

  getDeleteVideo = videoDetails => {
    this.setState(prev => ({
      savedVideosList: prev.savedVideosList.filter(
        eachVideo => eachVideo.id !== videoDetails.id,
      ),
    }))
  }

  getLikedVideo = videoDetails => {
    this.setState(prev => ({
      likedVideosList: [...prev.likedVideosList, videoDetails],
    }))
  }

  getDisLikedVideo = videoDetails => {
    this.setState(prev => ({
      disLikedVideosList: [...prev.disLikedVideosList, videoDetails],
    }))
  }

  getDeleteLikedVideo = videoDetails => {
    this.setState(prev => ({
      likedVideosList: prev.likedVideosList.filter(
        eachVideo => eachVideo.id !== videoDetails.id,
      ),
    }))
  }

  getDeleteDisLikedVideo = videoDetails => {
    this.setState(prev => ({
      disLikedVideosList: prev.likedVideosList.filter(
        eachVideo => eachVideo.id !== videoDetails.id,
      ),
    }))
  }

  render() {
    const {
      activeLanguageLight,
      savedVideosList,
      likedVideosList,
      disLikedVideosList,
      activeTab,
    } = this.state

    return (
      <NxtwatchContext.Provider
        value={{
          activeTab,
          activeTabClick: this.getActiveTab,

          activeLanguageLight,
          getBackGroundDark: this.getBackGroundDark,

          saveVideo: this.getSaveVideo,
          deleteVideo: this.getDeleteVideo,
          savedVideosList,
          likedVideosList,
          likeVideo: this.getLikedVideo,
          disLikedVideosList,
          disLikedVideo: this.getDisLikedVideo,
          deleteLikedVideo: this.getDeleteLikedVideo,
          deleteDisLikedVideo: this.getDeleteDisLikedVideo,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/saved-videos" component={SavedVideos} />
          <ProtectedRoute
            exact
            path="/videos/:id"
            component={VideoItemsDetails}
          />
          <ProtectedRoute exact path="/trending" component={Trending} />
          <ProtectedRoute exact path="/gaming" component={Gaming} />
          <ProtectedRoute component={NotFound} />
        </Switch>
      </NxtwatchContext.Provider>
    )
  }
}

export default App
