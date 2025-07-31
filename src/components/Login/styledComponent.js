import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  transition: all 0.3s ease;
  position: relative;
`

export const Box = styled.div`
  box-shadow: rgb(38, 57, 77) 0px 10px 20px -5px;
  border-radius: 10px;
  padding: 5vw;
  padding-top: 6vh;
  padding-bottom: 6vh;
  text-align: center;
`

export const Div = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 10px;
  margin-bottom: 5px;
  padding: 1vh;
`

export const ShowpasswordDiv = styled.div`
  display: felx;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 3px;
`

export const Button = styled.button`
  background-color: #3b82f6;
  color: #f1f1f1;
  padding: 15px;
  border: none;
  font-size: 18px;
  border-radius: 10px;
  width: 100%;
  cursor: pointer;
  margin-top: 3vh;
`
