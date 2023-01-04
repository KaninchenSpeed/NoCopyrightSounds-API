# NoCopyrightSounds API

This is a webscraper designed to provide api like access to the NCS website

## Features

-   Listing all Songs
-   Searching (using the search from the website)
-   getting artist info

-   caching songs (client class only)

## import

```js
//module (reccomended)
import * as ncs from 'nocopyrightsounds-api'

//CommonJS
const ncs = require('nocopyrightsounds-api')
```

## examples

## direct API Access

### get all songs from the first page in the music library

```js
import * as ncs from 'nocopyrightsounds-api'

ncs.getMusic(/*page here*/)
    .then(songs => {
        //use the songs here
        console.log(songs)
    })
    .catch(err => {
        //error handeling here
        console.error(err)
    })
```

### get all songs from the first page of house songs

```js
import * as ncs from 'nocopyrightsounds-api'

ncs.search(
    {
        genre: 10
    } /*page here*/
)
    .then(songs => {
        //use the songs here
        console.log(songs)
    })
    .catch(err => {
        //error handeling here
        console.error(err)
    })
```

### get artist info

```js
import * as ncs from 'nocopyrightsounds-api'
ncs.getArtistInfo(/* artist url here (/artist/760/srikar)*/)
    .then(artist => {
        //use the artist info here
        console.log(artist)
    })
    .catch(err => {
        //error handeling here
        console.error(err)
    })
```

### download the newest song

```js
import * as ncs from 'nocopyrightsounds-api'
import * as fs from 'fs'
import https from 'https'

ncs.getMusic()
    .then(async songs => {
        const newest = songs[0]
        const directUrl = newest.songUrl

        const writeStream = fs.createWriteStream(`${newest.name}.mp3`)

        https.get(directUrl, res => {
            res.pipe(writeStream)
        })
    })
    .catch(err => {
        //just simple error handeling
        console.error(err)
    })
```

## using the client class

```js
import * as ncs from 'nocopyrightsounds-api'

const client = new ncs.Client()

client
    .getSongs()
    .then(songs => {
        //use the songs here
        console.log(songs)
    })
    .catch(err => {
        //error handeling here
        console.error(err)
    })
```

### with caching

```js
import * as ncs from 'nocopyrightsounds-api'

const client = new ncs.Client({
  use_cache: true,
  cache_path: /*path for json file in nodejs or name for localstorage in browser*/
})
```

#### refreshing the cache

```js
client.getCache().checkForNew()
```

### for debuging

```js
import * as ncs from 'nocopyrightsounds-api'

const client = new ncs.Client({
    detailed_log: true
})
```
