import styled from 'styled-components/native'

export const ItemContent = styled.View`
  width: 100%;
  height: 50px;
  flex-direction: row;
  background-color: ${({theme}) => theme.theme === 'dark' ? theme.colors.background : theme.colors.primary};
`

export const TintItemContent = styled(ItemContent)`
  background-color: ${({theme}) => theme.theme === 'dark' ? theme.colors.primary : theme.colors.background};
`

export const FilterButton = styled.View`
  flex: 1;
  justify-content: center;
  align-items: flex-start;
  padding-left: 25px;
`

export const FilterText = styled.Text`
  color: #fff;
  font-size: 20px;
`

export const DeleteButton = styled.View`
  width: 50px;
  height: 50px;
  justify-content: center;
  align-items: center;
`