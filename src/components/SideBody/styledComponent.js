import styled from 'styled-components'

export const SideColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  width: 15vw;
  height: 90vh;
  padding-top: 1vh;
`

export const Div = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  color: #1e293b;
  line-height: 2.2;
  margin-top: 0.5vh;
  width: 14.5vw;
  padding-left: 0.5vw;
  cursor: pointer;
  border-radius: 2px;
`

export const TopSideColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start; 
  align-items: flex-start;
`

export const BottomSideColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const ContactMedia = styled.div`
  display: flex;
  flex-direction: row;
`

export const Image = styled.img`
  width: ${props => (props.isLarge === 'true' ? '' : '3vw')};
  height: ${props => (props.isLarge === 'true' ? '' : '5vh')};
  margin-right: ${props => (props.isLarge === 'true' ? '' : '6px')};
`

export const Para = styled.p`
  font-weight: bold;
  font-size: 16px;
`
