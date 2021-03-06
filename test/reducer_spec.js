/* eslint-env mocha */
import {Map, fromJS} from 'immutable'
import {expect} from 'chai'

// reducer can be imported without curly braces because it is the default export
import reducer from '../src/reducer'

describe('reducer', () => {
  it('handles SET_ENTRIES', () => {
    const initialState = Map()
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }))
  })

  it('handles NEXT', () => {
    const initialState = fromJS({
      entries: ['Trainspotting', '28 Days Later']
    })
    const action = { type: 'NEXT' }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    }))
  })

  it('handles VOTE', () => {
    const initialState = fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later']
      },
      entries: []
    })
    const action = { type: 'VOTE', entry: 'Trainspotting' }

    const nextState = reducer(initialState, action)

    expect(nextState).to.equal(fromJS({
      vote: {
        pair: ['Trainspotting', '28 Days Later'],
        tally: {
          'Trainspotting': 1
        }
      },
      entries: []
    }))
  })

  it('has an initial state', () => {
    const action = { type: 'SET_ENTRIES', entries: ['Trainspotting'] }

    const nextState = reducer(undefined, action)

    expect(nextState).to.equal(fromJS({
      entries: ['Trainspotting']
    }))
  })

  it('can be used with reduce', () => {
    // This is where the reducer gets its name. A reducer should be able to take
    // a state with a collection of actions and reduce() them into the current
    // state.
    const actions = [
      { type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later'] },
      { type: 'NEXT' },
      { type: 'VOTE', entry: 'Trainspotting' },
      { type: 'VOTE', entry: '28 Days Later' },
      { type: 'VOTE', entry: 'Trainspotting' },
      { type: 'NEXT' }
    ]

    // 1. reducer(Map(), actions[0])
    // 2. reducer(returned value from above, actions[1])
    // 3. and so on...
    const nextState = actions.reduce(reducer, Map())

    expect(nextState).to.equal(fromJS({
      winner: 'Trainspotting'
    }))
  })
})
