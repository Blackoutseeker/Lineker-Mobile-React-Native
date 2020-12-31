import React, { FC, useCallback, useEffect, useRef, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducerTemplate } from '../../../store/index'
import { qrModalActionTemplate } from '../../../store/reducers/QrModal'
import { TouchableNativeFeedback, Alert, ToastAndroid } from 'react-native'
import {
  ModalContent,
  SaveButton,
  SaveText
} from './styles'
import QrCode from 'react-native-qrcode-svg'
import Modal from 'react-native-modal'
import ViewShot from 'react-native-view-shot'
import * as MediaLibrary from 'expo-media-library'
import { getAsync, MEDIA_LIBRARY } from 'expo-permissions'
import getPermission from '../../../shared/PermissionMedia'

const QrModal: FC = () => {

  const qrValue = useSelector((state: rootReducerTemplate) => state.qrModal)
  const dispatch = useDispatch()
  const shotRef = useRef<ViewShot>(null)

  useEffect(() => {
    getPermission()
  }, [])

  const saveQrCode = useCallback(async() => {
    await getAsync(MEDIA_LIBRARY)
    .then(async({granted}) => {
      if(granted) {
        await shotRef.current?.capture!()
        .then(async(uri) => {
          await MediaLibrary.createAssetAsync(uri)
          .then(() => {
            ToastAndroid.show('QrCode saved in the gallery!', ToastAndroid.SHORT)
          })
        })
      }
      else {
        getPermission()
      }
    })
  }, [qrValue])

  const setVisibility = useCallback((): boolean => {
    if(qrValue !== '__null__') {
      return true
    }
    else {
      return false
    }
  }, [qrValue])

  const dismissQrModal = useCallback((): void => {
    dispatch<qrModalActionTemplate>({type: 'SET_QRMODAL_VALUE', payload: {qrModalValue: '__null__'}})
  }, [qrValue])

  return (
    <Modal isVisible={setVisibility()} hardwareAccelerated useNativeDriver animationIn={'fadeInUp'}
    useNativeDriverForBackdrop onBackButtonPress={dismissQrModal} onBackdropPress={dismissQrModal} >
      <ModalContent>
        <ViewShot ref={shotRef} >
          <QrCode value={qrValue} size={220} quietZone={10} />
        </ViewShot>
        <TouchableNativeFeedback onPress={saveQrCode}
        background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', false)} >
          <SaveButton>
            <SaveText>SAVE</SaveText>
          </SaveButton>
        </TouchableNativeFeedback>
      </ModalContent>
    </Modal>
  )
}

export default memo(QrModal)