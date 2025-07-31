import styled from 'styled-components'

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${props =>
    props.subContainer === 'true' ? 'space-between' : 'space-between'};
  align-items: center;
  padding-right: 1.5vw;
  padding-left: 1.5vw;
`

export const Button = styled.button`
  cursor: pointer;
  border-width: 2px;
  border-color: ${props =>
    props.logout === 'true' ? '#3b82f6' : 'transparent'};
  background-color: '#ffffff';
  font-size: 16px;
  color: ${props => (props.logout === 'true' ? '#3b82f6' : '')};
`

export const Profile = styled.img`
  width: 3vw;
  height: 4vh;
  margin: 5px;
`
