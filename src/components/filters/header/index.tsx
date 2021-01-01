import React, { FC, memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { TouchableNativeFeedback } from 'react-native'
import {
  HeaderContent,
  IconContent,
  Title
} from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const Header: FC = () => {

  const navigation = useNavigation()

  const navigateToMain = (): void => {
    navigation.navigate('Main')
  }

  return (
    <HeaderContent>
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', true, 30)}
      onPress={navigateToMain}>
        <IconContent>
          <FontAwesome5 name={'arrow-left'} color={'#fff'} size={20} />
        </IconContent>
      </TouchableNativeFeedback>
      <Title>Filters</Title>
    </HeaderContent>
  )
}

export default memo(Header)