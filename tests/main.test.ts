import * as ncs from '../src/main'

console.log('running getMusic')
ncs.getMusic().then(res => {
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

console.log('running artist info')
ncs.getArtistInfo('/artist/466/unknown-brain').then(res => {
  console.log('results artist info')
  console.log({...res, songs: [res.songs[0]]})
})