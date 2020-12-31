import React, { FC, useCallback, memo } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import {
  HeaderContent,
  IconContent,
  SearchInput
} from './styles'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

interface propsTemplate {
  shadow: {
    elevation: number;
  };
  searchingState: boolean;
  searchState: string;
  changeSearchState: (setState: string) => void;
  changeSearchingState: (setState: boolean) => void;
  theme: string
}

const SearchHeader: FC<propsTemplate> = (props) => {

  const {
    searchingState,
    changeSearchingState,
    searchState,
    changeSearchState,
    shadow,
    theme } = props

  const changeSearchValue= useCallback((value: string): void => {
    changeSearchState(value)
  }, [searchState])

  const resetSearchValue = useCallback(() => {
    changeSearchValue('')
  }, [searchState])

  const closeSearchHeader = useCallback((): void => {
    changeSearchingState(false)
    changeSearchValue('')
  }, [searchingState])

  const setRippleColor = useCallback((): string => {
    if(theme === 'dark') {
      return 'rgba(255, 255, 255, 0.3)'
    }
    else {
      return 'rgba(0, 0, 0, 0.3)'
    }
  }, [])

  return (
    <HeaderContent style={shadow} >
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(setRippleColor(), true, 30)}
      onPress={closeSearchHeader}>
        <IconContent>
          <FontAwesome5 name={'arrow-left'} color={'#888'} size={20} />
        </IconContent>
      </TouchableNativeFeedback>
        <SearchInput value={searchState} onChangeText={changeSearchValue}
        placeholder={'Title, URL, date...'} placeholderTextColor={'#888'} autoFocus />
      <TouchableNativeFeedback background={TouchableNativeFeedback.Ripple(setRippleColor(), true, 30)}
      onPress={resetSearchValue} >
        <IconContent>
          <FontAwesome5 name={'times'} color={'#888'} size={20} />
        </IconContent>
      </TouchableNativeFeedback>
    </HeaderContent>
  )
}

export default memo(SearchHeader)