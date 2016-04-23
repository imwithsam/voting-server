import {setEntries, next, vote} from './core'

// ES6 export default allows you to import without curly braces
export default function reducer (state, action) {
  switch (action.type) {
    case 'SET_ENTRIES':
      return setEntries(state, action.entries)
    case 'NEXT':
      return next(state)
    case 'VOTE':
      return vote(state, action.entry)
  }

  return state
}
