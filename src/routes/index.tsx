import React, { FC } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
import CustomDrawer from '../components/drawer/index'
import { useSelector } from 'react-redux'
import { rootReducerTemplate } from '../store/index'
import SignIn from '../screens/SignIn'
import Main from '../screens/Main'
import Filters from '../screens/Filters'
import Scan from '../screens/Scan'

const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const HomeStack: FC = () => {
  return (
    <Stack.Navigator initialRouteName= {'Main'} headerMode={'none'} >
      <Stack.Screen name={'Main'} component = {Main} />
      <Stack.Screen name={'Filters'} component = {Filters} />
      <Stack.Screen name={'Scan'} component = {Scan} />
    </Stack.Navigator>
  )
}

const HomeDrawer: FC = () => {
  return (
    <Drawer.Navigator drawerContentOptions={{itemStyle: {display: 'none'}}}
    drawerContent={() => <CustomDrawer />} >
      <Drawer.Screen name={'HomeStack'} component={HomeStack} />
    </Drawer.Navigator>
  )
}

const LoginStack: FC = () => {
  const initialRoute: string = useSelector((state: rootReducerTemplate) => state.route)

  return (
    <Stack.Navigator initialRouteName={initialRoute} headerMode={'none'} >
      <Stack.Screen name={'Login'} component={SignIn} />
      <Stack.Screen name={'Home'} component={HomeDrawer} />
    </Stack.Navigator>
  )
}

const Router: FC = () => {
  return (
    <NavigationContainer>
      <LoginStack />
    </NavigationContainer>
  )
}

export default Router