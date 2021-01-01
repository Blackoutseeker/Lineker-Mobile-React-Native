import React, { FC, useCallback, memo } from 'react'
import { useDispatch } from 'react-redux'
import { filterTemplate } from '../../../store/reducers/Filters'
import { currentFilterActionTemplate } from '../../../store/reducers/CurrentFilter'
import { Button } from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import firebase from '../../../utils/Firebase'
import { encodeForDatabase } from '../../../shared/DatabaseCodification'

interface propsTemplate {
  modalState: boolean;
  setModalState: (setState: boolean) => void;
  filterState?: string;
  setFilterState?: (setState: string) => void;
  filters?: filterTemplate[];
  userId?: string;
  shadow: {
    elevation: number
  }
}

const AddButton: FC<propsTemplate> = (props) => {

  const {
    modalState,
    setModalState,
    filterState,
    setFilterState,
    filters,
    userId,
    shadow
  } = props
  const hitSlop = {
    top: 10,
    left: 10,
    bottom: 10,
    right: 10
  }
  const dispatch = useDispatch()

  const changeModalState = useCallback((): void => {
    setModalState!(!modalState)
  }, [modalState])

  const verify = useCallback((): boolean => {
    let confirm = 0
    filters?.map((item) => {
      item.filter === filterState ? confirm += 1 : null
    })
    if(confirm === 0) {
      return true
    }
    else {
      return false
    }
  }, [filterState])

  const addFilter = useCallback(async() => {
    if(verify() && filterState !== '') {
      await firebase.database().ref(`users/${userId}/filters/${encodeForDatabase(filterState!)}`).set({
        filter: encodeForDatabase(filterState!)
      })
      .then(() => {
        dispatch<currentFilterActionTemplate>({type: 'SET_FILTER', payload: {setFilter: filterState!}})
        changeModalState()
        setFilterState!('')
      })
    }
  }, [filterState])

  const handlePress = (): void => {
    !modalState ? changeModalState() : addFilter()
  }

  return (
    <Button activeOpacity={0.7} onPress={handlePress} style={shadow} hitSlop={hitSlop} >
      <FontAwesome5 name={'plus'} color={'#fff'} size={20} />
    </Button>
  )
}

export default memo(AddButton)