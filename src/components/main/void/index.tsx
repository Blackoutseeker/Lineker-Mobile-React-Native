import React, { FC, memo } from 'react'
import {
  VoidContent,
  Text
} from './styles'
import { SvgXml } from 'react-native-svg'
import Drawer from '../../../assets/drawer.svg'

const Void: FC = () => {
  return (
    <VoidContent>
      <Text>No link found!</Text>
        <SvgXml width={120} height={120} xml={Drawer} />
      <Text>Add a link to get started!</Text>
    </VoidContent>
  )
}

export default memo(Void)