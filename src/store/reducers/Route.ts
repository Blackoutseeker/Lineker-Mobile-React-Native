const INITIAL_STATE: string = 'Login'

export interface routeActionTemplate {
  type: 'SET_ROUTE';
  payload: {
    routeName: string
  }
}

const Route = (state: string=INITIAL_STATE, action: routeActionTemplate): string => {
  switch(action.type) {
    case 'SET_ROUTE':
      return action.payload.routeName
    default:
      return state
  }
}

export default Route