import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const rootWidth = Dimensions.get('window').width

export const AddContent = styled.View`
  position: absolute;
  bottom: -18px;
  right: -18px;
  width: ${rootWidth}px;
  height: 75px;
  background-color: ${({theme}) => theme.colors.background};
  flex-direction: row;
`

export const InputContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`

export const Input = styled.TextInput`
  width: 100%;
  height: 35px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 20px;
  background-color: ${({theme}) => theme.theme === 'dark' ? theme.colors.primary : '#fff'};
  font-size: 22px;
  color: ${({theme}) => theme.theme === 'dark' ? '#fff' : '#333'};
`

export const ButtonContent = styled.View`
  width: 65px;
  height: 100%;
  justify-content: center;
  align-items: center;
`