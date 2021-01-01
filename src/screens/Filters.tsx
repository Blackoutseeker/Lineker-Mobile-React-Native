import React, { FC, useEffect, useCallback, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { rootReducerTemplate } from '../store/index'
import { currentFilterActionTemplate } from '../store/reducers/CurrentFilter'
import { filterActionTemplate, filterTemplate } from '../store/reducers/Filters'
import { Body } from '../components/filters/body/index'
import Header from '../components/filters/header/index'
import { FlatList, BackHandler } from 'react-native'
import { Footer } from '../components/filters/footer/index'
import FilterItem from '../components/filters/item/index'
import AddButton from '../components/filters/add/index'
import FilterModal from '../components/filters/modal/index'
import firebase from '../utils/Firebase'

const Filters: FC = () => {

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigation.navigate('Main')
    return false
  })

  const shadow = { elevation: 10 }
  const { userId } = useSelector((state: rootReducerTemplate) => state.userInfo)
  const currentFilter = useSelector((state: rootReducerTemplate) => state.currentFilter)
  const filters: filterTemplate[] = useSelector((state: rootReducerTemplate) => state.filters)
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const databaseRef = firebase.database().ref(`users/${userId}/filters`)
  const [data, setData] = useState<filterTemplate[] | null>(filters)
  const [modal, setModal] = useState<boolean>(false)

  useEffect(() => {
    setData(filters)
    let load = true
    if(load) {
      refresh()
    }
    return (() => {
      load = false
      setData(null)
      databaseRef.off('value')
      databaseRef.off('child_removed')
    })
  }, [])

  const refresh = useCallback((): void => {
    databaseRef.on('value', (snapshot) => {
      const getData: filterTemplate[] = []
      snapshot.forEach((snapshotchild) => {
        getData.push({
          filter: snapshotchild.val().filter
        })
      })
      setData(getData)
      dispatch<filterActionTemplate>({type: 'ADD_FILTER', payload: getData})
    })
    databaseRef.on('child_removed', () => {
      dispatch<currentFilterActionTemplate>({type: 'SET_FILTER', payload: {setFilter: 'Default'}})
    })
  }, [])

  return (
    <Body>
      <Header />
      <FlatList data={data} maxToRenderPerBatch={10}
      keyExtractor={(item) => item.filter} ListFooterComponent={Footer}
      renderItem={({item}) => (
        <FilterItem filter={item.filter} currentFilter={currentFilter}
        userId={userId!} />
      )} />
      <AddButton modalState={false} setModalState={setModal} shadow={shadow} />
      <FilterModal userId={userId!} modalState={modal} setModalState={setModal} shadow={shadow} />
    </Body>
  )
}

export default Filters