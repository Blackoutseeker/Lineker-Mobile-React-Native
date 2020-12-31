import React, { FC, useEffect, useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { Container } from '../components/scan/container/index'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Target from '../components/scan/target/index'
import PauseModal from '../components/scan/modal/index'
import { Clipboard, ToastAndroid, BackHandler } from 'react-native'
import { askAsync, getAsync, CAMERA } from 'expo-permissions'

const Scan: FC = () => {

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate('Main')
    return true
  })

  const navigation = useNavigation()
  const [pause, setPause] = useState<boolean>(false)
  const [qrValue, setQrValue] = useState<string>('__null__')

  useEffect(() => {
    getPermission()
  }, [])

  const getPermission = useCallback(async() => {
    await getAsync(CAMERA)
    .then(async({granted}) => {
      if(!granted) {
        await askAsync(CAMERA)
      }
    })
  }, [])

  const handleScan = useCallback(async({data}: {data: string}) => {
    if(!pause) {
      setPause(true)
      setQrValue(data)
      Clipboard.setString(data)
      ToastAndroid.show('QrCode content copied to clipboard!', ToastAndroid.SHORT)
    }
  }, [pause])

  return (
    <>
      <StatusBar hidden animated />
      <Container>
        <BarCodeScanner style={{flex: 1}} onBarCodeScanned={handleScan} />
        <Target />
        <PauseModal pauseState={pause} setPauseState={setPause} qrState={qrValue} />
      </Container>
    </>
  )
}

export default Scan