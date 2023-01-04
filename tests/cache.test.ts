import * as ncs from '../src/main'

const client = new ncs.Client({
    detailed_log: true,
    cache_path: 'tests/cache.json',
    use_cache: true
})

client.getCache()?.addEventListener('ready', () => {
    console.log('ready')
    client.getSongs().then((res) => {
        console.log('results client getMusic')
        console.log(res[0], res.length)
    })
})
