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
    console.log(res[0], res.length, res[0].tags?.at(0), res[0].tags?.length)
  })

console.log('running artist info')
ncs.getArtistInfo('/artist/172/harley-bird').then(res => {
  console.log('results artist info')
  console.log({ ...res, songs: [res.songs[0]] })
})

console.log('running client tests')
const client = new ncs.Client({
  detailed_log: true
})

console.log('running client getMusic')
client.getSongs().then(res => {
  console.log('results client getMusic')
  console.log(res[0], res.length)
})

console.log('running client Search')
client
  .search({
    search: 'you'
  })
  .then(res => {
    console.log('results client Search')
    console.log(res[0], res.length, res[0].tags?.at(0), res[0].tags?.length)
  })

console.log('running client artist info')
client.getArtistInfo('/artist/172/harley-bird').then(res => {
  console.log('results client artist info')
  console.log({ ...res, songs: [res.songs[0]] })
})