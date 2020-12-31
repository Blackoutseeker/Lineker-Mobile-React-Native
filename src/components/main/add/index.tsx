import React, { FC, useCallback, memo } from 'react'
import { LinkData } from '../../../databaseTemplates/index'
import { Button } from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import firebase from '../../../utils/Firebase'

interface propsTemplate {
  modalState: boolean;
  setModalState: (setState: boolean) => void;
  titleState?: string;
  setTitleState?: (setState: string) => void;
  urlState?: string;
  setUrlState?: (setState: string) => void;
  currentFilter?: string;
  userId?: string;
  shadow: {
    elevation: number
  }
}

const AddButton: FC<propsTemplate> = (props) => {

  const {
    modalState,
    setModalState,
    titleState,
    setTitleState,
    urlState,
    setUrlState,
    currentFilter,
    userId,
    shadow
  } = props
  const hitSlop = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  }

  const changeModalState = useCallback((): void => {
    setModalState!(!modalState)
  }, [modalState])

  const addLink = useCallback(async() => {
    if(urlState !== '') {
      const date = new Date()
      const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
      const newLink: LinkData = {
        title: titleState === '' ? 'Untitled' : titleState!,
        url: urlState!,
        date: `${day}/${month}/${date.getFullYear()}`,
        datetime: `${day}-${month}-${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
      }
      await firebase.database().ref(`users/${userId}/links/${currentFilter}/${newLink.datetime}`).set(newLink)
      .then(() => {
        setTitleState!('')
        setUrlState!('')
        changeModalState()
      })
    }
  }, [titleState, urlState, modalState])

  const handlePress = (): void => {
    !modalState ? changeModalState() : addLink()
  }

  return (
    <Button activeOpacity={0.7} onPress={handlePress} style={shadow} hitSlop={hitSlop} >
      <FontAwesome5 name={'plus'} color={'#fff'} size={20} />
    </Button>
  )
}

export default memo(AddButton)