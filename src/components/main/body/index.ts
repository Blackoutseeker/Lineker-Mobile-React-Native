import styled from 'styled-components/native'

export const DismissKeyboardArea = styled.TouchableWithoutFeedback`
  flex: 1;
`

export const Body = styled.View`
  flex: 1;
  background-color: ${({theme}) => theme.colors.background};
`