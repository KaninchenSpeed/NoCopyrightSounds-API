import * as test from './modules/simple_test'
import * as watch from './modules/watch'
import * as output from './modules/output'

import * as ncs from '../src/main'

interface Test {
  feature: Function
  args: any[][]
  label: string
}

const tests: Test[] = [
  {
    feature: ncs.getMusic,
    args: [[undefined], [1], [2], [3]],
    label: 'get Music'
  },
  {
    feature: ncs.search,
    args: [
      [{ genre: 1, mood: 1 }, undefined],
      [{ genre: 1, mood: 1 }, 1],
      [{ genre: 4, mood: 1 }, 2],
      [{ genre: 3, mood: 5 }, 3]
    ],
    label: 'search Music'
  }
]

const run = async () => {
  var error = false
  for (var i = 0; i < tests.length; i++) {
    const atest = tests[i]
    await new Promise<void>((res, rej) => {
      watch
        .handel(test.promise(atest.feature, atest.args), atest.label)
        .then(out => {
          res()
        })
        .catch(err => {
          error = true
          res()
        })
    })
  }
  if (error) {
    output.allFail()
  } else {
    output.allPass()
  }
}

run()

ncs.getMusic().then(songs => console.log(songs[0]))
