import styled from 'styled-components/native'

export const InputContent = styled.View`
  width: 85%;
  height: 45px;
  background-color: ${({theme}) => theme.colors.secundary};
  border-bottom-width: 2px;
  border-color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  flex-direction: row;
  margin-bottom: 15px;
`

export const IconContent = styled.View`
  width: 55px;
  height: 45px;
  justify-content: center;
  align-items: center;
`

export const Input = styled.TextInput`
  width: 90%;
  height: 45px;
  color: #fff;
  font-size: 24px;
  padding-right: 25px;
  padding-top: 0px;
  padding-bottom: 0px;
`