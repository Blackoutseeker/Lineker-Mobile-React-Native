import React, { FC, useCallback, useState } from 'react'
import { TouchableNativeFeedback, Clipboard } from 'react-native'
import {
  AddContent,
  InputContent,
  ButtonContent,
  TitleInput,
  UrlInput,
  PasteButton
} from './styles'
import Modal from 'react-native-modal'
import AddButton from '../add/index'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface propsTemplate {
  modalState: boolean;
  setModalState: (setValue: boolean) => void;
  currentFilter: string;
  userId: string;
  shadow: {
    elevation: number
  }
}

const LinkModal: FC<propsTemplate> = (props) => {

  const { modalState, setModalState, currentFilter, userId, shadow } = props
  const [titleValue, setTitleValue] = useState<string>('')
  const [urlValue, setUrlValue] = useState<string>('')

  const changeTitleState = useCallback((value: string): void => {
    setTitleValue(value)
  }, [titleValue])

  const changeUrlState = useCallback((value: string): void => {
    setUrlValue(value)
  }, [urlValue])

  const pasteUrl = useCallback(async() => {
    const clipboardValue: string = await Clipboard.getString()
    changeUrlState(clipboardValue)
  }, [urlValue])

  const dismissModal = useCallback((): void => {
    changeTitleState('')
    changeUrlState('')
    setModalState(false)
  }, [modalState])

  return (
    <Modal isVisible={modalState} hardwareAccelerated useNativeDriver useNativeDriverForBackdrop
    onBackButtonPress={dismissModal} onBackdropPress={dismissModal} >
        <AddContent>
          <InputContent>
            <TitleInput value={titleValue} onChangeText={changeTitleState}
            autoFocus placeholder={'Title'} placeholderTextColor={'#888'} />
            <UrlInput value={urlValue} onChangeText={changeUrlState}
            placeholder={'URL'} placeholderTextColor={'#888'} keyboardType={'email-address'} />
            <TouchableNativeFeedback onPress={pasteUrl}
            background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', true, 20)} >
              <PasteButton>
                <FontAwesome5 name={'paste'} color={'#fff'} size={20} />
              </PasteButton>
            </TouchableNativeFeedback>
          </InputContent>
          <ButtonContent>
            <AddButton userId={userId} titleState={titleValue} urlState={urlValue}
            setTitleState={setTitleValue} setUrlState={setUrlValue} modalState={true}
            setModalState={setModalState} currentFilter={currentFilter} shadow={shadow} />
          </ButtonContent>
        </AddContent>
    </Modal>
  )
}

export default LinkModal