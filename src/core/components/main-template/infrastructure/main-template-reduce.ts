import { Action } from './action'
import { State } from './state'

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'search':
      return {
        ...state,
        keywordsR: action.result,
      }
    case 'refreshValue':
      return {
        ...state,
        keywordsR: action.result,
      }
    case 'clearValue':
      return {
        ...state,
        keywordsR: action.result,
      }
  }
}
