import styled from 'styled-components/native'

export const ExpandedContent = styled.View`
  width: 100%;
  align-items: center;
`

export const ItemContent = styled.View`
  width: 92%;
  height: 70px;
  align-items: center;
  flex-direction: row;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-color: ${({theme}) => theme.colors.secundary};
`

export const InfoContent = styled.View`
  flex: 1;
  height: 50px;
  margin-left: 8px;
  margin-right: 8px;
`

export const TextContent = styled.ScrollView`
  flex: 1;
  flex-direction: row;
`

export const TitleText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`

export const UrlText = styled.Text`
  color: #fff;
  font-size: 18px;
  text-decoration: underline;
`

export const Button = styled.View`
  width: 50px;
  height: 70px;
  justify-content: center;
  align-items: center;
`