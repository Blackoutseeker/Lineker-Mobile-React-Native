import React, { FC, useCallback, useState } from 'react'
import {
  AddContent,
  InputContent,
  ButtonContent,
  Input
} from './styles'
import Modal from 'react-native-modal'
import AddButton from '../add/index'

interface propsTemplate {
  modalState: boolean;
  setModalState: (setValue: boolean) => void;
  userId: string;
  shadow: {
    elevation: number
  }
}

const FilterModal: FC<propsTemplate> = (props) => {

  const { modalState, setModalState, userId, shadow } = props
  const [filterValue, setFilterValue] = useState<string>('')

  const changeFilterValue = useCallback((value: string): void => {
    setFilterValue(value)
  }, [filterValue])

  const dismissModal = useCallback((): void => {
    changeFilterValue('')
    setModalState(false)
  }, [modalState])

  return (
    <Modal isVisible={modalState} hardwareAccelerated useNativeDriver useNativeDriverForBackdrop
    onBackButtonPress={dismissModal} onBackdropPress={dismissModal} >
        <AddContent>
          <InputContent>
            <Input value={filterValue} onChangeText={changeFilterValue}
            autoFocus placeholder={'Filter'} placeholderTextColor={'#888'} />
          </InputContent>
          <ButtonContent>
            <AddButton userId={userId} filterState={filterValue} setFilterState={setFilterValue}
            modalState={true} setModalState={setModalState} shadow={shadow} />
          </ButtonContent>
        </AddContent>
    </Modal>
  )
}

export default FilterModal