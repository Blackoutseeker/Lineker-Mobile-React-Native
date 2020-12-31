const INITIAL_STATE: userInfoTemplate = {
  email: undefined,
  userId: undefined,
}

export interface userInfoTemplate {
  email: string | undefined;
  userId: string | undefined
}

export interface userInfoActionTemplate {
  type: 'SET_USER_INFO';
  payload: userInfoTemplate
}

const UserInfo = (state: userInfoTemplate=INITIAL_STATE, action: userInfoActionTemplate): userInfoTemplate => {
  switch(action.type) {
    case 'SET_USER_INFO':
      return {...action.payload}
    default:
      return state
  }
}

export default UserInfo