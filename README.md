# Voting Server

## Overview

Voting Server is a practice real-time voting app using React, Redux, and
Immutable.

More info at: [Full-Stack Redux
Tutorial](http://teropa.info/blog/2015/09/10/full-stack-redux-tutorial.html)

## Setting Up the App

`npm install`

Pretty standard - will install the dependencies you need.

## Running the Tests

`npm run test` or `npm run test:watch`

The latter will automatically run the tests after any changes in the code.

The testing framework consists of Mocha, Chai, and Chai-Immutable.

## State

Examples of state structure:

### Active Vote

```
Map({
  vote: Map({
    pair: List.of('Trainspotting', '28 Days Later'),
    tally: Map({
      'Trainspotting': 4,
      '28 Days Later': 3
    })
  }),
  entries: List.of('Sunshine', 'Millions', '127 Hours')
})
```

### Winner

```
Map({
  winner: 'Trainspotting'
})
```
