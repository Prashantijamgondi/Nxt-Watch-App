import {Link} from 'react-router-dom'
import {formatDistanceToNow} from 'date-fns'

import NxtwatchContext from '../../context/NxtwatchContext'
import './index.css'

const VideoCard = props => (
  <NxtwatchContext.Consumer>
    {value => {
      const {eachVideoItem} = props
      const {title, thumbnailUrl, viewCount, publishedAt, channel, id} =
        eachVideoItem
      const {name} = channel

      const stripPrefix = text => {
        const prefixes = ['about', 'over', 'almost', 'more than', 'less than']
        const words = text.split(' ')
        return prefixes.includes(words[0]) ? words.slice(1).join(' ') : text
      }
      const rawDistance = formatDistanceToNow(new Date(publishedAt), {
        addSuffix: true,
      })
      const expire = stripPrefix(rawDistance)
      const {activeLanguageLight} = value
      const videoTitleColors = activeLanguageLight ? '#1e293b' : '#ebebeb'

      return (
        <Link to={`/videos/${id}`} className="link">
          <div className="video-container">
            <img
              src={thumbnailUrl}
              alt="video thumbnail"
              className="thumbnail"
            />
            <div className="video-info" style={{color: videoTitleColors}}>
              <h1 className="video-title">{title}</h1>
              <p className="video-name" style={{color: '#616e7c'}}>
                {name}
              </p>
              <div className="view-expire-container" style={{color: '#616e7c'}}>
                <p>{viewCount} views </p>
                <p>. {expire}</p>
              </div>
            </div>
          </div>
        </Link>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default VideoCard
