import styled from 'styled-components/native'
import { Dimensions } from 'react-native'

const rootWidth = Dimensions.get('window').width

export const TargetContent = styled.View`
  position: absolute;
  left: ${rootWidth - 300}px;
  width: 240px;
  height: 240px;
`

export const CornersTopContent = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: flex-start;
  flex-direction: row;
`

export const CornersBottomContent = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
`

const Corner = styled.View`
  width: 20%;
  height: 35%;
  border-width: 2px;
`

export const LeftTopCorner = styled(Corner)`
  border-left-color: #fff;
  border-top-color: #fff;
  border-right-color: transparent;
  border-bottom-color: transparent;
`

export const RightTopCorner = styled(Corner)`
  border-right-color: #fff;
  border-top-color: #fff;
  border-left-color: transparent;
  border-bottom-color: transparent;
`

export const LeftBottomCorner = styled(Corner)`
  border-left-color: #fff;
  border-bottom-color: #fff;
  border-right-color: transparent;
  border-top-color: transparent;
`

export const RightBottomCorner = styled(Corner)`
  border-right-color: #fff;
  border-bottom-color: #fff;
  border-left-color: transparent;
  border-top-color: transparent;
`