import React from 'react'

const NxtwatchContext = React.createContext({
  getBackGroundDark: () => {},
  activeLanguageLight: false,

  activeTab: '',

  changeFilter: () => {},

  videosList: [],

  savedVideosList: [],
  saveVideo: () => {},

  likedVideosList: [],
  likeVideo: () => {},
  deleteLikedVideo: () => {},

  disLikedVideosList: [],
  disLikVideo: () => {},
  deleteDisLikedVideo: () => {},
})

export default NxtwatchContext
