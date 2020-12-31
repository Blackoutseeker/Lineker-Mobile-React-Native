import React, { FC, useCallback, memo } from 'react'
import { Button } from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface propsTemplate {
  setPauseState: (setState: boolean) => void
}

const ReloadButton: FC<propsTemplate> = (props) => {

  const { setPauseState } = props

  const changePauseState = useCallback((): void => {
    setPauseState(false)
  }, [])

  return (
    <Button activeOpacity={0.7} onPress={changePauseState} >
      <FontAwesome5 name={'redo-alt'} color={'#fff'} size={25} />
    </Button>
  )
}

export default memo(ReloadButton)