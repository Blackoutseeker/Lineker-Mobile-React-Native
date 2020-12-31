import React, { FC, useRef, memo } from 'react'
import { ModalContent } from './styles'
import Modal from 'react-native-modal'
import ViewShot from 'react-native-view-shot'
import QrCode from 'react-native-qrcode-svg'
import Footer from '../footer/index'

interface propsTemplate {
  pauseState: boolean;
  setPauseState: (setState: boolean) => void;
  qrState: string
}

const PauseModal: FC<propsTemplate> = (props) => {

  const { pauseState, setPauseState, qrState } = props
  const shotRef = useRef<ViewShot>(null)

  return (
    <Modal isVisible={pauseState} >
      <ModalContent>
        <ViewShot ref={shotRef} >
          <QrCode value={qrState} size={240} quietZone={10} />
        </ViewShot>
        <Footer setPauseState={setPauseState} shotRef={shotRef} />
      </ModalContent>
    </Modal>
  )
}

export default memo(PauseModal)