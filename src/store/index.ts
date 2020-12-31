import { combineReducers, createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { AsyncStorage } from 'react-native'
import Theme from './reducers/Theme'
import UserInfo, { userInfoTemplate } from './reducers/UserInfo'
import Route from './reducers/Route'
import CurrentFilter from './reducers/CurrentFilter'
import Filters, { filterTemplate } from './reducers/Filters'
import Links from './reducers/Links'
import { LinkData } from '../databaseTemplates/index'
import QrModal from './reducers/QrModal'

export interface rootReducerTemplate {
  theme: boolean;
  userInfo: userInfoTemplate;
  route: string;
  currentFilter: string;
  filters: filterTemplate[];
  links: LinkData[] | null;
  qrModal: string
}

interface persistConfigTemplate {
  key: string;
  storage: AsyncStorage;
  withelist: string[];
  blacklist?: string[]
}

const rootReducer = combineReducers<rootReducerTemplate>({
  theme: Theme,
  userInfo: UserInfo,
  route: Route,
  currentFilter: CurrentFilter,
  filters: Filters,
  links: Links,
  qrModal: QrModal
})

const persistConfig: persistConfigTemplate = {
  key: 'root',
  storage: AsyncStorage,
  withelist: [
    'theme',
    'userInfo',
    'route',
    'currentFilter',
    'filters'
  ],
  blacklist: [
    'qrModal'
  ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)