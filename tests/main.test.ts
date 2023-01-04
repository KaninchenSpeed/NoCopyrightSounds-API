import ncs from '../src/main'

console.log('running getMusic')
ncs.getMusic().then((res) => {
    console.log('results getMusic', res.length)
    console.dir(res[0], { depth: null })
})

console.log('running Search')
ncs.search({
    search: 'you',
    genre: ncs.Genre.Electronic
}).then((res) => {
    console.log('results Search', res.length)
    console.dir(res[0], { depth: null })
})

console.log('running artist info')
ncs.getArtistInfo('/artist/172/harley-bird').then((res) => {
    console.log('results artist info')
    console.dir({ ...res, songs: [res.songs[0]] }, { depth: null })
})
