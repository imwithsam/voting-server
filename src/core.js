import {List, Map} from 'immutable'

function getWinners (vote) {
  if (!vote) return []

  const [a, b] = vote.get('pair')
  const aVotes = vote.getIn(['tally', a], 0)
  const bVotes = vote.getIn(['tally', b], 0)

  if (aVotes > bVotes) {
    return [a]
  } else if (bVotes > aVotes) {
    return [b]
  } else {
    return [a, b]
  }
}

export const INITIAL_STATE = Map()

export function setEntries (state, entries) {
  return state.set('entries', List(entries))
}

export function next (state) {
  const entries = state.get('entries').concat(getWinners(state.get('vote')))

  if (entries.size === 1) {
    // Map({ winner: entries.first() }) could have been returned instead, but it
    // is better to be more explicit about state changes. This has the added
    // benefit of reducing the likelihood of errors should state contain other
    // data in the future.
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first())
  } else {
    // The merge below did not work exactly like I thought it might.
    // If the original state has a tally under vote, the tally will be lost
    // because the vote containing just the pair will replace the original vote.
    return state.merge({
      vote: Map({ pair: entries.take(2) }),
      entries: entries.skip(2)
    })
  }
}

export function vote (state, entry) {
  return state.updateIn(
    ['vote', 'tally', entry],
    0,
    (count) => count + 1
  )
}
