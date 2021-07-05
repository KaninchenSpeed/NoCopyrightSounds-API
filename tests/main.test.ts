import * as test from './modules/simple_test'
import * as watch from './modules/watch'
import * as output from './modules/output'

import * as ncs from '../src/main'

Promise.all([
  watch.handel(
    test.promise(ncs.getMusic, [[undefined], [1], [2], [3]]),
    'getMusic'
  ),
])
  .then(outs => {
    output.allPass()
  })
  .catch(err => {
    output.allFail()
  })
