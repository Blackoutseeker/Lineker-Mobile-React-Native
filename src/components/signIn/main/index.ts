import styled from 'styled-components/native'

export const Main = styled.TouchableWithoutFeedback`
  flex: 1;
`

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background};
`