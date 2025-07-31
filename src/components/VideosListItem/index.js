import {Link} from 'react-router-dom'

import {formatDistanceToNow} from 'date-fns'
import {BsDot} from 'react-icons/bs'

import NxtwatchContext from '../../context/NxtwatchContext'
import './index.css'

const VideosListItem = props => {
  const {eachVideoItem} = props
  const {title, thumbnailUrl, viewCount, publishedAt, channel, id} =
    eachVideoItem
  const {name, profileImageUrl} = channel

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
        const colorVideoTitle = activeLanguageLight ? '#1e293b' : '#ebebeb'

        return (
          <Link to={`/videos/${id}`} className="link">
            <div className="videos-container">
              <img
                src={thumbnailUrl}
                alt="video thumbnail"
                className="thumbnail-img"
              />
              <div className="video-content-container">
                <img
                  src={profileImageUrl}
                  alt="channel logo"
                  className="channel-logo"
                />
                <div className="video-info-container">
                  <h1 className="video-title" style={{color: colorVideoTitle}}>
                    {title}
                  </h1>
                  <p className="video-name">{name} </p>
                  <div className="view-expire-container">
                    <p>{viewCount}views</p>
                    <p>
                      <BsDot />
                      {expire}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      }}
    </NxtwatchContext.Consumer>
  )
}

export default VideosListItem
