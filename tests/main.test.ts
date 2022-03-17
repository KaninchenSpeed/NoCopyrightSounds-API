import * as ncs from '../src/main'

console.log('running getMusic')
ncs
  .getMusic()
  .then(res => {
    console.log('results getMusic')
    console.log(res[0], res.length)
  })

console.log('running Search')
ncs
  .search({
    search: 'you'
  })
  .then(res => {
    console.log('results Search')
    console.log(res[0], res.length)
  })
