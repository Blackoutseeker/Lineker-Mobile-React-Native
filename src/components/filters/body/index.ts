import styled from 'styled-components/native'

export const Body = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.theme === 'dark' ? theme.colors.background : theme.colors.primary};
`