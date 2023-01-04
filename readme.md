# NoCopyrightSounds API

This is a webscraper designed to provide api like access to the NCS website

## Features

-   Listing all Songs
-   Searching (using the search from the website)
-   getting artist info

-   caching songs (client class only)

## import

```js
//module (recommended)
import ncs from 'nocopyrightsounds-api'

//CommonJS
const ncs = require('nocopyrightsounds-api')
```

### Typescript
Don't forget to set `esModuleInterop` to `true`

## Examples

## Get all songs from the first page in the music library

```js
import ncs from 'nocopyrightsounds-api'

ncs.getMusic(/*page here*/)
    .then((songs) => {
        //use the songs here
        console.log(songs)
    })
    .catch((err) => {
        //error handeling here
        console.error(err)
    })
```

## Get all songs from the first page of house songs

```js
import ncs from 'nocopyrightsounds-api'

ncs.search(
    {
        genre: 10
    } /*page here*/
)
    .then((songs) => {
        //use the songs here
        console.log(songs)
    })
    .catch((err) => {
        //error handeling here
        console.error(err)
    })
```

## Get artist info

```js
import ncs from 'nocopyrightsounds-api'
ncs.getArtistInfo(/* artist url here (/artist/760/srikar)*/)
    .then((artist) => {
        //use the artist info here
        console.log(artist)
    })
    .catch((err) => {
        //error handeling here
        console.error(err)
    })
```

## Download the newest song

```js
import ncs from 'nocopyrightsounds-api'
import fs from 'fs'
import https from 'https'

ncs.getMusic()
    .then(async (songs) => {
        const newest = songs[0]
        const directUrl = newest.songUrl

        const writeStream = fs.createWriteStream(`${newest.name}.mp3`)

        https.get(directUrl, (res) => {
            res.pipe(writeStream)
        })
    })
    .catch((err) => {
        //just simple error handeling
        console.error(err)
    })
```