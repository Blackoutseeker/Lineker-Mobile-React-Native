import styled from 'styled-components/native'

export const HeaderContent = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  background-color: ${({theme}) => theme.theme === 'dark' ? theme.colors.secundary : '#fff'};
`

export const IconContent = styled.View`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`

export const SearchInput = styled.TextInput`
  flex: 1;
  padding-left: 20px;
  padding-top: 0px;
  padding-bottom: 0px;
  color: ${({theme}) => theme.theme === 'dark' ? '#fff' : '#333'};
  font-size: 18px;
`