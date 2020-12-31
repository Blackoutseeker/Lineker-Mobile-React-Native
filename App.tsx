import React, { FC, useContext } from 'react'
import { LogBox } from 'react-native'
import { ThemeProvider } from 'styled-components'
import { Provider, useSelector } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor, rootReducerTemplate } from './src/store/index'
import light from './src/styles/themes/light'
import dark from './src/styles/themes/dark'
import Router from './src/routes/index'

LogBox.ignoreLogs(['Setting a timer'])

const ThemeInvolve: FC = () => {
  const theme: boolean = useSelector((state: rootReducerTemplate) => state.theme)

  return (
    <ThemeProvider theme={theme ? dark : light} >
      <Router />
    </ThemeProvider>
  )
}

const ReduxInvolve: FC = () => {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <ThemeInvolve />
      </PersistGate>
    </Provider>
  )
}

export default ReduxInvolve