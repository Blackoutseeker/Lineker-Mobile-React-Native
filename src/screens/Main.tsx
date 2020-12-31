import React, { FC, useEffect, useContext, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DefaultTheme, ThemeContext } from 'styled-components'
import { rootReducerTemplate } from '../store/index'
import { linksActionTemplate } from '../store/reducers/Links'
import { LinkData } from '../databaseTemplates/index'
import { BackHandler, Keyboard } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { DismissKeyboardArea, Body } from '../components/main/body'
import Header from '../components/main/header/index'
import SearchHeader from '../components/main/search/index'
import FilterHeader from '../components/main/filter/index'
import { ListContent } from '../components/main/list/index'
import { FlatList } from 'react-native'
import { Footer } from '../components/main/footer/index'
import Void from '../components/main/void/index'
import LinkItem from '../components/main/item/index'
import AddButton from '../components/main/add/index'
import ScanButton from '../components/main/scan/index'
import LinkModal from '../components/main/modal/index'
import QrModal from '../components/main/qrModal/index'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import firebase from '../utils/Firebase'

const Main: FC = () => {
  FontAwesome5.loadFont

  BackHandler.addEventListener('hardwareBackPress', () => {
    return true
  })

  const shadow = { elevation: 10 }
  const { colors, theme } = useContext<DefaultTheme>(ThemeContext)
  const { userId } = useSelector((state: rootReducerTemplate) => state.userInfo)
  const currentFilter = useSelector((state: rootReducerTemplate) => state.currentFilter)
  const links = useSelector((state: rootReducerTemplate) => state.links)
  const dispatch = useDispatch()
  const databaseRef = firebase.database().ref(`users/${userId}`)
  const [searching, setSearching] = useState<boolean>(false)
  const [searchValue, setSearchValue] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [data, setData] = useState<LinkData[] | null>(links)
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    setData(links)
    setLoading(true)
    let load = true
    if(load) {
      refresh()
    }
    return (() => {
      load = false
      setData(null)
      setLoading(false)
      databaseRef.off('value')
    })
  }, [currentFilter, userId])

  const dismissKeyboard = (): void => {
    Keyboard.dismiss()
  }

  const refresh = () => {
    databaseRef.on('value', (snpashot) => {
      const getData: LinkData[] = []
      if(snpashot.hasChild('links')) {
        if(snpashot.child('links').hasChild(currentFilter)) {
          snpashot.child(`links/${currentFilter}`).forEach((snapshotchild) => {
            getData.push({
              title: snapshotchild.val().title,
              url: snapshotchild.val().url,
              date: snapshotchild.val().date,
              datetime: snapshotchild.val().datetime,
            })
          })
          setData(getData)
          dispatch<linksActionTemplate>({type: 'ADD_LINKS', payload: getData})
          setLoading(false)
        }
        else {
          setData(null)
          dispatch<linksActionTemplate>({type: 'DEL_LINKS', payload: null})
          setLoading(false)
        }
      }
      else {
        setData(null)
        dispatch<linksActionTemplate>({type: 'DEL_LINKS', payload: null})
        setLoading(false)
      }
    })
  }

  const filteredData: LinkData[] | undefined = data?.filter(item => {
    return item.title.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.url.toLowerCase().includes(searchValue.toLowerCase()) ||
    item.date.includes(searchValue)
  })

  return (
    <DismissKeyboardArea onPress={dismissKeyboard} >
      <Body>
        <StatusBar backgroundColor={colors.primary} style={'light'} translucent={false} hidden={false} animated />
        {!searching
          ? <Header shadow={shadow} searchingState={searching} changeSearchingState={setSearching} />
          : <SearchHeader shadow={shadow} searchingState={searching} changeSearchingState={setSearching}
            searchState={searchValue} changeSearchState={setSearchValue} theme={theme} />
        }
        <FilterHeader />
        {filteredData
          ? <ListContent>
              <FlatList data={filteredData.reverse()} maxToRenderPerBatch={10} refreshing={loading} onRefresh={refresh}
              style={{flex: 1}} ListFooterComponent={Footer} keyExtractor={item => item.datetime}
              renderItem={({item}) => (
                <LinkItem date={item.date} datetime={item.datetime} title={item.title}
                url={item.url} userId={userId!} currentFilter={currentFilter} />
              )} />
            </ListContent>
          : <Void />
        }
        {!searching
          ? <>
              <AddButton modalState={false} setModalState={setModal} shadow={shadow} />
              <ScanButton shadow={shadow} />
            </>
          : null
        }
        <LinkModal modalState={modal} setModalState={setModal}
        userId={userId!} currentFilter={currentFilter} shadow={shadow} />
        <QrModal />
      </Body>
    </DismissKeyboardArea>
  )
}

export default Main