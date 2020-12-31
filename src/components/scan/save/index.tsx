import React, { FC, useCallback, memo, RefObject } from 'react'
import { ToastAndroid } from 'react-native'
import { Button } from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import ViewShot from 'react-native-view-shot'
import getPermission from '../../../shared/PermissionMedia'
import * as MediaLibrary from 'expo-media-library'

interface propsTemplate {
  shotRef: RefObject<ViewShot>
}

const SaveButton: FC<propsTemplate> = (props) => {

  const { shotRef } = props
  
  const saveQrCode = useCallback(async() => {
    await getPermission()
    .then(async() => {
      await shotRef.current?.capture!()
      .then(async(uri) => {
        await MediaLibrary.createAssetAsync(uri)
        .then(() => {
          ToastAndroid.show('QrCode saved in the gallery!', ToastAndroid.SHORT)
        })
      })
    })
  }, [])

  return (
    <Button activeOpacity={0.7} onPress={saveQrCode} >
      <FontAwesome5 name={'save'} color={'#fff'} size={25} />
    </Button>
  )
}

export default memo(SaveButton)