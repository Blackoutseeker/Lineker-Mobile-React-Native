import React, { FC, useContext, useCallback } from 'react'
import { ThemeContext, DefaultTheme } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { routeActionTemplate } from '../../store/reducers/Route'
import { userInfoActionTemplate } from '../../store/reducers/UserInfo'
import { themeActionTemplate } from '../../store/reducers/Theme'
import { linksActionTemplate } from '../../store/reducers/Links'
import { filterActionTemplate } from '../../store/reducers/Filters'
import { currentFilterActionTemplate } from '../../store/reducers/CurrentFilter'
import { rootReducerTemplate } from '../../store/index'
import { version } from '../../../package.json'
import { Linking } from 'react-native'
import {
  DrawerContent,
  DrawerHeader,
  DrawerItemContent,
  Logo,
  EmailContent,
  Email,
  ItemContent,
  IconContent,
  ItemText,
  Version
} from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

const CustomDrawer: FC = () => {

  const { theme } = useContext<DefaultTheme>(ThemeContext)
  const { email } = useSelector((state: rootReducerTemplate) => state.userInfo)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const changeTheme = useCallback((): void => {
    dispatch<themeActionTemplate>({type: theme === 'dark' ? 'LIGHT' : 'DARK'})
  }, [theme])

  const openDesktopLink = async() => {
    await Linking.openURL('https://github.com/Blackoutseeker/Lineker-desktop/releases/tag/v1.0.0')
  }

  const signOut = (): void => {
    dispatch<userInfoActionTemplate>({type: 'SET_USER_INFO', payload: {email: undefined, userId: undefined}})
    dispatch<routeActionTemplate>({type: 'SET_ROUTE', payload: {routeName: 'Login'}})
    dispatch<currentFilterActionTemplate>({type: 'SET_FILTER', payload: {setFilter: 'Default'}})
    dispatch<filterActionTemplate>({type: 'RES_FILTER'})
    dispatch<linksActionTemplate>({type: 'DEL_LINKS', payload: null})
    dispatch<themeActionTemplate>({type: 'LIGHT'})
    navigation.navigate('Login')
  }

  const reduceEmail = useCallback((): string | undefined => {
    if(email) {
      return email!.length < 27 ? email : email!.slice(0, 27) + '...'
    }
    else {
      return undefined
    }
  }, [email])

  return (
    <DrawerContent>
      <DrawerHeader>
        <Logo source={require('../../assets/Lineker.png')} resizeMode={'contain'} />
        <EmailContent>
          <Email>{reduceEmail()}</Email>
        </EmailContent>
      </DrawerHeader>
      <DrawerItemContent>
        <ItemContent activeOpacity={0.7} onPress={changeTheme} >
          <IconContent>
            <FontAwesome5 name={theme === 'dark' ? 'sun' : 'moon'} solid color={'#fff'} size={20} />
          </IconContent>
          <ItemText>Switch Theme</ItemText>
        </ItemContent>
        <ItemContent activeOpacity={0.7} onPress={openDesktopLink} >
          <IconContent>
            <FontAwesome5 name={'desktop'} color={'#fff'} size={20} />
          </IconContent>
          <ItemText>Get to desktop</ItemText>
        </ItemContent>
        <ItemContent activeOpacity={0.7} onPress={signOut} >
          <IconContent>
            <FontAwesome5 name={'sign-out-alt'} color={'#fff'} size={20} style={{transform: [{ rotate: '180deg' }]}} />
          </IconContent>
          <ItemText>Sign-Out</ItemText>
        </ItemContent>
        <Version>{`v${version}`}</Version>
      </DrawerItemContent>
    </DrawerContent>
  )
}

export default CustomDrawer