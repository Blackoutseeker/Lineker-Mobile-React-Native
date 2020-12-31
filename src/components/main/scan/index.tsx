import React, { FC, useCallback, memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Button } from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface propsTemplate {
  shadow: {
    elevation: number
  }
}

const ScanButton: FC<propsTemplate> = (props) => {

  const { shadow } = props
  const navigation = useNavigation()

  const navigateToScan = useCallback((): void => {
    navigation.navigate('Scan')
  }, [])

  return (
    <Button activeOpacity={0.7} onPress={navigateToScan} style={shadow} >
      <FontAwesome5 name={'camera'} color={'#fff'} size={20} />
    </Button>
  )
}

export default memo(ScanButton)