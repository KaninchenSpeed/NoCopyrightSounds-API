# NoCopyrightSounds API

This is a webscraper designed to provide an api like access to the NCS website

## Features

- List
- Search

## import

```js
//module (reccomended)
import * as ncs from 'nocopyrightsounds-api'

//CommonJS
const ncs = require('nocopyrightsounds-api')
```

## examples

### get all songs from the first page in the music library

```js
import * as ncs from 'nocopyrightsounds-api'

ncs
  .getMusic(/*page here*/)
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

ncs
  .search(
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

### download the newest song

```js
import * as ncs from 'nocopyrightsounds-api'
import * as fs from 'fs'
import https from 'https'

ncs
  .getMusic()
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
