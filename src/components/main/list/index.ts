import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { StatusBar } from 'react-native'
const rootHeight = Dimensions.get('window').height
const statusBarHeight = StatusBar.currentHeight

export const ListContent = styled.View`
  position: absolute;
  top: 100px;
  width: 100%;
  height: ${rootHeight - 100 - statusBarHeight!}px;
`