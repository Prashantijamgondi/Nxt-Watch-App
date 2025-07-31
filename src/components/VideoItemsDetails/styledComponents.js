import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 2vw;
  padding-right: 2vw;
  padding-bottom: 10vh;
  overflow-y: scroll;
  height: 95vh;
`

export const OneBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  overflow-x: hidden;
  position: fixed;
`

export const Head = styled.h1`
  font-size: 20px;
  margin-top: 2vh;
`

export const Button = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  border: none;
  background-color: transparent;
`

export const ChannelContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-items: center;
`

export const RetryButton = styled.button`
  border: solid;
  cursor: pointer;
  border-width: 2px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
  margin-left: 10px;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: bold;
`

// export const Div = styled.div`
//   display: flex;
//   flex-direction: row;
//   align-items: center;
// `
