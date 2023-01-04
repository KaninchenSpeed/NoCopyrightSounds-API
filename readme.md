# NoCopyrightSounds API

This is a webscraper designed to provide api like access to the NCS website.

## Features

-   Listing all Songs
-   Searching (using the search from the website)
-   Getting artist info

## Updating from 2.1.3

### Breaking changes

-   Page indices start from 0 insted of 1
-   Rename: `getMusic(page)` => `getSongs(page)`
-   **Song object**
    -   `songUrl` => `previewUrl`
    -   `imageUrl` => `coverUrl`
    -   Date is now a Date object

### New stuff

-   Enums for Genre and Mood
-   Filter for instrumental songs
-   **Song object**
    -   download section with regular and/or instrumental downloads

## Import

```js
//module (recommended)
import ncs from 'nocopyrightsounds-api'

//CommonJS
const ncs = require('nocopyrightsounds-api')
```

### Typescript

Don't forget to set `esModuleInterop` to `true`

## Examples

**Top level await is only available with es modules in NodeJS.**

### Get all songs from the first page in the music library

```js
import ncs from 'nocopyrightsounds-api'

const songs = await ncs.getSongs(/* page here */)

// use the songs here
console.log(songs)
```

### Get all songs from the first page of house songs

```js
import ncs from 'nocopyrightsounds-api'

const results = await ncs.search(
    {
        // filter
        genre: ncs.Genre.House
    }
    /* page here */
)

// use the results here
console.log(results)
```

### Get artist info

```js
import ncs from 'nocopyrightsounds-api'

const artistInfo = await ncs.getArtistInfo(/* artist url here (/artist/760/srikar) */)

// use the artistinfo info here
console.log(artistInfo)
```

### Download the newest song

```js
import ncs from 'nocopyrightsounds-api'
import axios from 'axios'
import fs from 'fs/promises'

// getting the newest 20 songs (20 songs = 1 page)
const songs = await ncs.getSongs()

const newestSong = songs[0]
const audioUrl = newestSong.download.regular

if (!audioUrl) throw "This Song doesn't have a regular (non instrumental) version!"

// downloading audio
const { data: audioFile } = await axios.get(audioUrl, {
    responseType: 'arraybuffer'
})

await fs.writeFile(`${newestSong.name}.mp3`, audioFile)
```
