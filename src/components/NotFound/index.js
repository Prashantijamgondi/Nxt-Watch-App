import SideBody from '../SideBody'
import Header from '../Header'
import NxtwatchContext from '../../context/NxtwatchContext'

import {OneBody} from '../Trending/styledComponent'

const NotFound = () => (
  <NxtwatchContext.Consumer>
    {value => {
      const {activeLanguageLight} = value
      const image = activeLanguageLight
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'
      const color = activeLanguageLight ? '#1e293b' : '#f9f9f9'

      return (
        <div data-testid="trending">
          <Header />
          <OneBody>
            <SideBody />
            <div>
              <img src={image} alt="" style={{width: '30vw', height: '20vh'}} />
              <h1 style={{color}}>Page Not Found</h1>
              <p style={{color}}>
                We are sorry, the page you requested could not be found.
              </p>
            </div>
          </OneBody>
        </div>
      )
    }}
  </NxtwatchContext.Consumer>
)

export default NotFound
