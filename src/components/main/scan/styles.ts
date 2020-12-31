import styled from 'styled-components/native'

export const Button = styled.TouchableOpacity`
  position: absolute;
  bottom: 10px;
  left: 10px;
  width: 55px;
  height: 55px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  background-color: ${({theme}) => theme.colors.secundary};
`