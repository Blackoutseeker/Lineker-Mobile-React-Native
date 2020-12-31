const INITIAL_STATE: boolean = false

export interface themeActionTemplate {
  type: 'DARK' | 'LIGHT'
}

const Theme = (state: boolean=INITIAL_STATE, action: themeActionTemplate): boolean => {
  switch(action.type) {
    case 'DARK':
      return true
    case 'LIGHT':
      return false
    default:
      return state
  }
}

export default Theme