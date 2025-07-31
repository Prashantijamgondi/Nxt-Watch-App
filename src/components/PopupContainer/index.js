import {Popup} from 'reactjs-popup'
import {AiOutlineClose} from 'react-icons/ai'
import 'reactjs-popup/dist/index.css'

import './index.css'

const PopupContainer = () => (
  <Popup
    open
    modal
    closeOnDocumentClick
    closeOnEscape={false}
    className="popup-container"
    overlayStyle={{background: 'transparent'}}
    id="pop"
  >
    {close => (
      <div id="popup-box">
        <div className="banner-left">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="nxt watch logo"
            className="banner-logo"
          />
          <p className="banner-text">
            Buy Nxt Watch Premium prepaid plans with UPI
          </p>
          <button type="button" className="banner-button">
            GET IT NOW
          </button>
        </div>
        <button
          data-testid="close"
          onClick={() => {
            const box = document.getElementById('popup-box')
            if (box) box.remove()
            close()
          }}
          className="close-btn"
          type="button"
        >
          <AiOutlineClose size={20} />
        </button>
      </div>
    )}
  </Popup>
)

// const PopupContainer = () => (
//   <div id="popup-box">
//     <div className="banner-left">
//       <img
//         src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
//         alt="nxt watch logo"
//         className="banner-logo"
//       />
//       <p className="banner-text">
//         Buy Nxt Watch Premium prepaid plans with UPI
//       </p>
//       <button type="button" className="banner-button">
//         GET IT NOW
//       </button>
//     </div>
//     <button
//       onClick={() => {
//         const box = document.getElementById('popup-box')
//         if (box) box.remove()
//       }}
//       type="button"
//       className="close-btn"
//     >
//       <AiOutlineClose size={20} />
//     </button>
//   </div>
// )

export default PopupContainer
