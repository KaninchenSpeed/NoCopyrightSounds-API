import * as ncs from '../src/main'

console.log('running getMusic')
ncs.getMusic().then(songs => {
  console.log('results getMusic')
  console.log(songs[0])
})
console.log('running Search')
ncs
  .search({
    genre: 1,
    mood: 1
  })
  .then(res => {
    console.log('results Search')
    console.log(res[0])
  })
