import React, { FC, useCallback, memo } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { currentFilterActionTemplate } from '../../../store/reducers/CurrentFilter'
import { TouchableNativeFeedback } from 'react-native'
import {
  ItemContent,
  TintItemContent,
  FilterButton,
  FilterText,
  DeleteButton
} from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import firebase from '../../../utils/Firebase'
import { decodeFromDatabase, encodeForDatabase } from '../../../shared/DatabaseCodification'

interface propsTemplate {
  currentFilter: string;
  filter: string;
  userId: string
}

const FilterItem: FC<propsTemplate> = (props) => {

  const { userId, filter, currentFilter } = props
  const filterDecoded = decodeFromDatabase(filter!)
  const filterEncoded = encodeForDatabase(filter!)
  const currentFilterEncoded = encodeForDatabase(currentFilter!)
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const reduceText = useCallback((): string => {
    return filterDecoded.length < 22 ? filterDecoded : filterDecoded.slice(0, 22) + '...'
  }, [])

  const setCurrentFilter = useCallback((): void => {
    if(currentFilter !== filter) {
      dispatch<currentFilterActionTemplate>({type: 'SET_FILTER', payload: {setFilter: filterEncoded}})
      navigation.navigate('Main')
    }
  }, [currentFilter])

  const deleteFilter = useCallback(async() => {
    await firebase.database().ref(`users/${userId}/filters/${filterEncoded}`).remove()
    await firebase.database().ref(`users/${userId}/links/${filterEncoded}`).remove()
    dispatch<currentFilterActionTemplate>({type: 'SET_FILTER', payload: {setFilter: 'Default'}})
  }, [])

  if(currentFilterEncoded === filter) {
    return (
      <TintItemContent>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', true)}
        onPress={setCurrentFilter}>
          <FilterButton>
            <FilterText>{reduceText()}</FilterText>
          </FilterButton>
        </TouchableNativeFeedback>
        {filter !== 'Default'
          ? <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c00', true, 25)}
            onPress={deleteFilter}>
              <DeleteButton>
                <FontAwesome5 name={'trash'} color={'#fff'} size={20} />
              </DeleteButton>
            </TouchableNativeFeedback>
          : null
        }
      </TintItemContent>
    )
  }
  else {
    return (
      <ItemContent>
        <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('rgba(255, 255, 255, 0.3)', true)}
        onPress={setCurrentFilter}>
          <FilterButton>
            <FilterText>{reduceText()}</FilterText>
          </FilterButton>
        </TouchableNativeFeedback>
        {filter !== 'Default'
          ? <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple('#c00', true, 25)}
            onPress={deleteFilter}>
              <DeleteButton>
                <FontAwesome5 name={'trash'} color={'#fff'} size={20} />
              </DeleteButton>
            </TouchableNativeFeedback>
          : null
        }
      </ItemContent>
    )
  }
}

export default memo(FilterItem)