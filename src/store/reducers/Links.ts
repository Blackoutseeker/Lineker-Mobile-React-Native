import { LinkData } from '../../databaseTemplates/index'
const INITIAL_STATE = null

export interface linksActionTemplate {
  type: 'ADD_LINKS' | 'DEL_LINKS';
  payload: LinkData[] | null
}

const Links = (state: LinkData[] | null=INITIAL_STATE, action: linksActionTemplate): LinkData[] | null => {
  switch (action.type) {
    case 'ADD_LINKS':
    case 'DEL_LINKS':
      return action.payload
    default:
      return state
  }
}

export default Links