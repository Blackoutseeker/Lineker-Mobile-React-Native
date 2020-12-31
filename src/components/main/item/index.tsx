import React, { FC, useCallback, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducerTemplate } from '../../../store/index'
import { qrModalActionTemplate } from '../../../store/reducers/QrModal'
import { LinkData } from '../../../databaseTemplates/index'
import {
  Linking,
  Clipboard,
  ToastAndroid,
  TouchableNativeFeedback
} from 'react-native'
import {
  ExpandedContent,
  ItemContent,
  InfoContent,
  TextContent,
  TitleText,
  UrlText,
  Button
} from './styles'
import QrCode from 'react-native-qrcode-svg'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import firebase from '../../../utils/Firebase'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface propsTemplate extends LinkData {
  userId: string;
  currentFilter: string
}

const LinkItem: FC<propsTemplate> = (props) => {

  const { datetime, title, url, userId, currentFilter } = props
  const qrModal = useSelector((state: rootReducerTemplate) => state.qrModal)
  const dispatch = useDispatch()

  const checkSecurity = useCallback((): string => {
    if(url.includes('https')) {
      return 'lock'
    }
    else {
      return 'exclamation-triangle'
    }
  }, [])

  const setIconColor = useCallback((): string => {
    if(checkSecurity() === 'lock') {
      return '#18b52a'
    }
    else {
      return '#e0c007'
    }
  }, [])

  const openUrl = async() => {
    if(await Linking.canOpenURL(url)) {
      await Linking.openURL(url)
    }
    else {
      ToastAndroid.show('Can\'t open this URL', ToastAndroid.SHORT)
    }
  }

  const copyToClipboard = (): void => {
    Clipboard.setString(url)
    ToastAndroid.show('URL copied to the clipboard', ToastAndroid.SHORT)
  }

  const deleteLink = useCallback(async() => {
    await firebase.database().ref(`users/${userId}/links/${currentFilter}/${datetime}`).remove()
  }, [])

  const showQrModal = useCallback((): void => {
    dispatch<qrModalActionTemplate>({type: 'SET_QRMODAL_VALUE', payload: {qrModalValue: url}})
  }, [qrModal])

  return (
    <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(0, 0, 0, 0)', false)} >
      <ExpandedContent>
        <ItemContent>
          <TouchableOpacity activeOpacity={0.7} onPress={showQrModal} >
            <QrCode value={url} color={'#fff'} backgroundColor={'transparent'} size={50} />
          </TouchableOpacity>
          <InfoContent>
            <TextContent horizontal >
              <TitleText onPress={() => {}} >{title}</TitleText>
            </TextContent>
            <TextContent horizontal contentContainerStyle={{justifyContent: 'center', alignItems: 'center'}} >
              <FontAwesome5 name={checkSecurity()} color={setIconColor()} size={17} style={{marginRight: 8}} />
              <UrlText onPress={openUrl} >{url}</UrlText>
            </TextContent>
          </InfoContent>
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', false)} onPress={copyToClipboard} >
            <Button>
              <FontAwesome5 name={'copy'} solid color={'#fff'} size={22} />
            </Button>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c00', false)} onPress={deleteLink} >
            <Button>
              <FontAwesome5 name={'trash'} color={'#fff'} size={22} />
            </Button>
          </TouchableNativeFeedback>
        </ItemContent>
      </ExpandedContent>
    </TouchableNativeFeedback>
  )
}

export default memo(LinkItem)