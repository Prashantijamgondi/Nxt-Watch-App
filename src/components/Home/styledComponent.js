import styled from 'styled-components'

export const OneBody = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  position: fixed;
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0px;
  margin-bottom: 20px;
  overflow-y: auto;
`

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  padding-left: 1.5vw;
`

export const Button = styled.button`
  padding: 10px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #4f46e5;
  color: #f1f1f1;
  cursor: pointer;
  border: solid;
  border-color: #4f46e5;
  border-radius: 5px;
`

// export const Div = styled.div`
//   display: flex;
//   flex-direction: ${props => (props.isLink === 'true' ? 'row' : 'column')};
//   justify-content: flex-start;
//   align-items: ${props => (props.isLink === 'true' ? 'center' : '')};
//   margin-top: 15px;
//   margin-bottom: 5px;
//   color: #1e293b;
//   background-color: ${props => (props.isLink === 'true' ? '#f1f1f1' : '')};
//   line-height: ${props => (props.isLink === 'true' ? '1.6' : '')};
//   width: ${props => (props.isLink === 'true' ? '16vw' : '')};
// `

// export const Image = styled.img`
//   width: ${props => (props.isLarge === 'true' ? '' : '3vw')};
//   height: ${props => (props.isLarge === 'true' ? '' : '5vh')};
//   margin-right: ${props => (props.isLarge === 'true' ? '' : '6px')};
// `
