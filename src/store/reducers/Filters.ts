const INITIAL_STATE: filterTemplate[] = [{
  filter: 'Default'
}]

export interface filterTemplate {
  filter: string
}

export interface filterActionTemplate {
  type: 'ADD_FILTER' | 'RES_FILTER';
  payload?: filterTemplate[]
}

const Filters = (state: filterTemplate[]=INITIAL_STATE, action: filterActionTemplate): filterTemplate[] => {
  switch (action.type) {
    case 'ADD_FILTER':
      return {...action.payload!}
    case 'RES_FILTER':
      return INITIAL_STATE
    default:
      return state
  }
}

export default Filters