const INITIAL_STATE: string = 'Default'

export interface currentFilterActionTemplate {
  type: 'SET_FILTER';
  payload: {
    setFilter: string
  }
}

const CurrentFilter = (state: string=INITIAL_STATE, action: currentFilterActionTemplate): string => {
  switch (action.type) {
    case 'SET_FILTER':
      return action.payload.setFilter
    default:
      return state
  }
}

export default CurrentFilter