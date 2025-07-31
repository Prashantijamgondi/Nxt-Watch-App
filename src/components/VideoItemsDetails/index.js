import {Component} from 'react'
import Cookies from 'js-cookie'
import YouTube from 'react-youtube'
import Loader from 'react-loader-spinner'
import {formatDistanceToNow} from 'date-fns'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'
import {MdPlaylistAdd} from 'react-icons/md'
import {BsDot} from 'react-icons/bs'

import NxtwatchContext from '../../context/NxtwatchContext'
import {
  Container,
  OneBody,
  Head,
  Button,
  ChannelContainer,
  FailureContainer,
  RetryButton,
} from './styledComponents'

import Header from '../Header'
import SideBody from '../SideBody'

import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  progress: 'PROGRESS',
}

class VideoItemsDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial, videoDetail: []}

  componentDidMount() {
    this.getVideoDetails()
  }

  getVideoDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: apiStatusConstant.progress})

    const api = `https://apis.ccbp.in/videos/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const option = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(api, option)
    if (response.ok === true) {
      const responseData = await response.json()
      const videoDetails = responseData.video_details
      const updatedData = {
        channel: {
          name: videoDetails.channel.name,
          profileImageUrl: videoDetails.channel.profile_image_url,
          subscriberCount: videoDetails.channel.subscriber_count,
        },
        description: videoDetails.description,
        id: videoDetails.id,
        publishedAt: videoDetails.published_at,
        thumbnailUrl: videoDetails.thumbnail_url,
        title: videoDetails.title,
        videoUrl: videoDetails.video_url,
        viewCount: videoDetails.view_count,
        isLiked: false,
        isDisLiked: false,
      }
      this.setState({
        apiStatus: apiStatusConstant.success,
        videoDetail: updatedData,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  getLikeDisLikedVideo = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {
          likedVideosList,
          likeVideo,
          deleteLikedVideo,
          activeLanguageLight,
        } = value
        const {disLikedVideosList, disLikedVideo, deleteDisLikedVideo} = value
        const {videoDetail} = this.state
        const iconColor = activeLanguageLight ? '#616e7c' : '#94a3b8'

        const isLikedVideo = likedVideosList.find(
          eachVideo => eachVideo.id === videoDetail.id,
        )

        const isDisLikedVideo = disLikedVideosList.find(
          eachVideo => eachVideo.id === videoDetail.id,
        )

        const likeIt = () => {
          if (isDisLikedVideo) {
            deleteDisLikedVideo(videoDetail)
          }
          likeVideo(videoDetail)
        }

        const disLikeIt = () => {
          if (isLikedVideo) {
            deleteLikedVideo(videoDetail)
          }
          disLikedVideo(videoDetail)
        }

        const deleteLikedIt = () => {
          deleteLikedVideo(videoDetail)
        }

        const deleteDisLikedIt = () => {
          deleteDisLikedVideo(videoDetail)
        }

        return (
          <>
            <Button
              onClick={isLikedVideo ? deleteLikedIt : likeIt}
              type="button"
              style={{
                color: isLikedVideo ? 'blue' : iconColor,
                marginRight: '10px',
              }}
            >
              <AiOutlineLike style={{height: '25px', width: '25px'}} />
              {isLikedVideo ? 'Liked' : 'Like'}
            </Button>
            <Button
              onClick={isDisLikedVideo ? deleteDisLikedIt : disLikeIt}
              type="button"
              style={{color: isDisLikedVideo ? 'blue' : iconColor}}
            >
              <AiOutlineDislike style={{height: '25px', width: '25px'}} />
              {isDisLikedVideo ? 'Disliked' : 'Dislike'}
            </Button>
          </>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  getSaveVideo = () => (
    <NxtwatchContext.Consumer>
      {value => {
        const {saveVideo, deleteVideo, savedVideosList, activeLanguageLight} =
          value
        const {videoDetail} = this.state
        const iconColor = activeLanguageLight ? '#616e7c' : '#94a3b8'

        const saveIt = () => {
          saveVideo(videoDetail)
        }

        const deleteIt = () => {
          deleteVideo(videoDetail)
        }

        const isSaved = savedVideosList.find(
          eachId => eachId.id === videoDetail.id,
        )

        return (
          <Button
            type="button"
            onClick={isSaved ? deleteIt : saveIt}
            style={{color: isSaved ? 'blue' : iconColor, marginLeft: '0.5vw'}}
          >
            <MdPlaylistAdd style={{height: '25px', width: '25px'}} />
            <p>{isSaved ? ' Saved' : ' Save'}</p>
          </Button>
        )
      }}
    </NxtwatchContext.Consumer>
  )

  getVideosDetailsStatus = () => {
    const {videoDetail} = this.state
    const {publishedAt} = videoDetail
    const getVideoIdFromUrl = url => {
      const parts = url.split('v=')
      if (parts.length > 1) {
        return parts[1].split('&')[0]
      }
      return ''
    }

    const stripPrefix = text => {
      const prefixes = ['about', 'over', 'almost', 'more than', 'less than']
      const words = text.split(' ')
      return prefixes.includes(words[0]) ? words.slice(1).join(' ') : text
    }

    const rawDistance = formatDistanceToNow(new Date(publishedAt), {
      addSuffix: true,
    })

    const expire = stripPrefix(rawDistance)

    return (
      <NxtwatchContext.Consumer>
        {value => {
          const {activeLanguageLight} = value
          const backgroundColor = activeLanguageLight ? '#f9f9f9' : '#0f0f0f'
          const VideoHeadColor = activeLanguageLight ? '#475569' : '#f9f9f9'
          const videoParaColor = activeLanguageLight ? '#64748b' : '#94a3b8'
          const descriptionColor = activeLanguageLight ? '#616e7c' : '#f9f9f9'

          return (
            <Container style={{backgroundColor}}>
              <YouTube
                videoId={getVideoIdFromUrl(videoDetail.videoUrl)}
                id="youtube"
              />
              <Head style={{color: VideoHeadColor}}>{videoDetail.title}</Head>
              <div className="views-container">
                <div className="views" style={{color: videoParaColor}}>
                  <p>{videoDetail.viewCount}</p>
                  <BsDot style={{marginLeft: '3px', marginRight: '3px'}} />
                  <p>{expire}</p>
                </div>
                <div className="views">
                  {this.getLikeDisLikedVideo()}
                  {this.getSaveVideo()}
                </div>
              </div>
              <hr className="horizontal-line" />
              <ChannelContainer>
                <img
                  className="channel-logo"
                  src={videoDetail.channel.profileImageUrl}
                  alt="channel logo"
                />
                <div className="channel-container">
                  <Head style={{color: VideoHeadColor}}>
                    {videoDetail.channel.name}
                  </Head>
                  <p style={{fontSize: '14px', color: videoParaColor}}>
                    {videoDetail.channel.subscriberCount} subscribers
                  </p>
                  <p
                    className="description"
                    style={{marginTop: '6vh', color: descriptionColor}}
                  >
                    {videoDetail.description}
                  </p>
                </div>
              </ChannelContainer>
            </Container>
          )
        }}
      </NxtwatchContext.Consumer>
    )
  }

  retryOnce = () => {
    this.getVideoDetails()
  }

  getVideosFailureStatus = () => (
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

  getVideosProgressStatus = () => (
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

  startFirstStep = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.getVideosDetailsStatus()
      case apiStatusConstant.failure:
        return this.getVideosFailureStatus()
      case apiStatusConstant.progress:
        return this.getVideosProgressStatus()
      default:
        return null
    }
  }

  render() {
    return (
      <div data-testid="videoItemDetails">
        <Header />
        <OneBody>
          <SideBody />
          <>{this.startFirstStep()}</>
        </OneBody>
      </div>
    )
  }
}

export default VideoItemsDetails
