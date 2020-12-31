import styled from 'styled-components/native'

export const HeaderContent = styled.View`
  position: absolute;
  top: 0px;
  width: 100%;
  height: 50px;
  background-color: ${({theme}) => theme.colors.primary};
  flex-direction: row;
`

export const IconContent = styled.View`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`

export const TitleContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const WhiteTitle = styled.Text`
  position: absolute;
  color: #fff;
  font-size: 24px;
`

export const CustomTitle = styled.Text`
  color: ${({theme}) => theme.theme === 'dark' ? '#777' : '#111'};
`