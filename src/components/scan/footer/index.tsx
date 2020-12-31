import React, { FC, memo, RefObject } from 'react'
import { FooterContent } from './styles'
import ViewShot from 'react-native-view-shot'
import ReloadButton from '../reload/index'
import SaveButton from '../save/index'

interface propsTemplate {
  setPauseState: (setState: boolean) => void;
  shotRef: RefObject<ViewShot>
}

const Footer: FC<propsTemplate> = (props) => {

  const { setPauseState, shotRef } = props

  return (
    <FooterContent>
      <ReloadButton setPauseState={setPauseState} />
      <SaveButton shotRef={shotRef} />
    </FooterContent>
  )
}

export default memo(Footer)