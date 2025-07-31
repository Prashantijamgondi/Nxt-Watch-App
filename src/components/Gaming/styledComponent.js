import styled from 'styled-components'

export const OneBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: fixed;
`

export const Round = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #d7dfe9;
  border-radius: 100px;
  padding: 1rem;
  margin-top: 6px;
  margin-bottom: 6px;
`

export const FailureContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-items: center;
  width: 90vw;
`

export const RetryButton = styled.button`
  border: solid;
  cursor: pointer;
  border-width: 2px;
  padding: 12px;
  padding-left: 25px;
  padding-right: 25px;
  background-color: #4f46e5;
  color: #ffffff;
  font-weight: 600;
  border-radius: 10px;
`

// export const Div = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: flex-start;
//   height: 100vh;
// `
