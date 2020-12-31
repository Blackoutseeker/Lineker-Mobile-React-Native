import React, { FC, useCallback, memo } from 'react'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { TouchableNativeFeedback } from 'react-native'
import {
  HeaderContent,
  IconContent,
  TitleContent,
  WhiteTitle,
  CustomTitle
} from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface propsTemplate {
  shadow: {
    elevation: number
  };
  searchingState: boolean;
  changeSearchingState: (setState: boolean) => void
}

const Header: FC<propsTemplate> = (props) => {

  const { searchingState, changeSearchingState, shadow } = props
  const navigation = useNavigation()

  const openDrawer = (): void => {
    navigation.dispatch(DrawerActions.openDrawer())
  }

  const openSearchHeader = useCallback((): void => {
    changeSearchingState(true)
  }, [searchingState])

  return (
    <HeaderContent style={shadow} >
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', true, 30)}
      onPress={openDrawer}>
        <IconContent>
          <FontAwesome5 name={'bars'} color={'#fff'} size={20} />
        </IconContent>
      </TouchableNativeFeedback>
      <TitleContent>
        <WhiteTitle>Lin<CustomTitle>e</CustomTitle>k<CustomTitle>er</CustomTitle></WhiteTitle>
      </TitleContent>
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', true, 30)}
      onPress={openSearchHeader} >
        <IconContent>
          <FontAwesome5 name={'search'} color={'#fff'} size={20} />
        </IconContent>
      </TouchableNativeFeedback>
    </HeaderContent>
  )
}

export default memo(Header)