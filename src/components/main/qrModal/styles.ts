import styled from 'styled-components/native'

export const ModalContent = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const SaveButton = styled.View`
  position: absolute;
  bottom: 30px;
  width: 80%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${({theme}) => theme.colors.secundary};
`

export const SaveText = styled.Text`
  color: #fff;
  font-size: 22px;
`