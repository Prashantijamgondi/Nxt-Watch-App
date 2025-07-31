import {FaFire} from 'react-icons/fa'
import {formatDistanceToNow} from 'date-fns'
import {Link} from 'react-router-dom'

import NxtwatchContext from '../../context/NxtwatchContext'
import Header from '../Header'
import SideBody from '../SideBody'

import {OneBody} from '../Home/styledComponent'
import './index.css'

import {
  Div,
  Para,
  Img,
  Head,
  Round,
  Thumbnail,
  Card,
  Title,
} from './styledComponent'

const noVideosFound = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {activeLanguageLight} = value
      const savedBackgroundColor = activeLanguageLight ? '#f9f9f9' : '#0f0f0f'

      const colorCode = activeLanguageLight ? '#1e293b' : '#ebebeb'

      return (
        <Div
          style={{
            backgroundColor: savedBackgroundColor,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            height: '100vh',
          }}
        >
          <Img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
            alt="no saved videos"
          />
          <Head style={{color: colorCode}}>No saved videos found</Head>
          <Para style={{color: colorCode}}>
            You can save your videos while watching them
          </Para>
        </Div>
      )
    }}
  </NxtwatchContext.Consumer>
)

const getSavedVideos = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {savedVideosList, activeLanguageLight} = value

      if (savedVideosList.length === 0) {
        return noVideosFound()
      }
      const savedHeadingBackgroundColor = activeLanguageLight
        ? '#ebebeb'
        : '#231f20'
      const trendingBackgroundColor = activeLanguageLight
        ? '#f9f9f9'
        : '#0f0f0f'
      const roundBackcolor = activeLanguageLight ? '#d7dfe9' : '#000000'
      const savedHeading = activeLanguageLight ? '#1e293b' : '#f9f9f9'
      const colorCode = activeLanguageLight ? '#1e293b' : '#ebebeb'

      return (
        <div
          style={{
            backgroundColor: trendingBackgroundColor,
            overflowY: 'scroll',
            scrollbarWidth: 'none',
            height: '100vh',
          }}
          className="heading-saved"
        >
          <div
            className="trending-heading-container"
            style={{backgroundColor: savedHeadingBackgroundColor}}
          >
            <Round style={{backgroundColor: roundBackcolor, margin: '1rem'}}>
              <FaFire style={{color: 'red', width: '30px', height: '30px'}} />
            </Round>
            <h1
              style={{marginLeft: '10px', color: savedHeading}}
              className="trending-heading"
            >
              Trending
            </h1>
          </div>
          <div>
            {savedVideosList.map(eachVideo => {
              const {id} = eachVideo
              const stripPrefix = text => {
                const prefixes = [
                  'about',
                  'over',
                  'almost',
                  'more than',
                  'less than',
                ]
                const words = text.split(' ')
                return prefixes.includes(words[0])
                  ? words.slice(1).join(' ')
                  : text
              }

              const datas = formatDistanceToNow(
                new Date(eachVideo.publishedAt),
                {
                  addSuffix: true,
                },
              )
              const expire = stripPrefix(datas)

              return (
                <Link
                  to={`/videos/${id}`}
                  style={{textDecoration: 'transparent'}}
                >
                  <Card>
                    <Thumbnail
                      src={eachVideo.thumbnailUrl}
                      alt="video thumbnail"
                    />
                    <div style={{marginLeft: '1vw'}}>
                      <Title style={{color: colorCode}}>
                        {eachVideo.title}
                      </Title>
                      <p style={{color: '#616e7c'}}>{eachVideo.channel.name}</p>
                      <div
                        className="view-expire-container"
                        style={{color: '#616e7c'}}
                      >
                        <p>{eachVideo.viewCount} views </p>
                        <p>. {expire}</p>
                      </div>
                    </div>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      )
    }}
  </NxtwatchContext.Consumer>
)

const SavedVideos = () => (
  <div data-testid="savedVideos">
    <Header />
    <OneBody>
      <SideBody />
      <>{getSavedVideos()}</>
    </OneBody>
  </div>
)

export default SavedVideos
