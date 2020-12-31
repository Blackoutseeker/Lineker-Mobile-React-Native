import styled from 'styled-components/native'

export const DrawerContent = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.theme === 'dark' ? theme.colors.primary : theme.colors.background};
`

export const DrawerHeader = styled.View`
  width: 100%;
  height: 140px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.theme === 'dark' ? theme.colors.background : theme.colors.primary};
`

export const DrawerItemContent = styled.View`
  flex: 1;
`

export const Logo = styled.Image`
  height: 100px;
`

export const EmailContent = styled.View`
  width: 95%;
  margin-top: 10px;
`

export const Email = styled.Text`
  color: #fff;
  font-size: 16px;
`

export const ItemContent = styled.TouchableOpacity`
  width: 100%;
  height: 50px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`

export const IconContent = styled.View`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`

export const ItemText = styled.Text`
  color: #fff;
  font-size: 18px;
  margin-left: 5px;
`

export const Version = styled.Text`
  position: absolute;
  left: 10px;
  bottom: 10px;
  color: #fff;
  font-size: 14px;
`