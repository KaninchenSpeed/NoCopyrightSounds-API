import fetch from 'node-fetch'
import cheerio from 'cheerio'
import { parse as parseHTML } from 'node-html-parser'

import Artist from '../classes/artist'
import Song from '../classes/song'

export const getMusic = (page?: number): Promise<Song[]> => {
  return new Promise<Song[]>((resolve, reject) => {
    fetch(`https://ncs.io/music?page=${page ? page : 1}`)
      .then(res => {
        return res.text()
      })
      .then(html => {
        const root = cheerio.load(html)
        const songsHtml = root('div.col-lg-2.item').toArray()
        const songs: Song[] = songsHtml.map((song) => {
          const img_link = root('a[href]', song)
          const link = String(img_link.attr('href'))

          const date = String(root('p[title]', song).attr('title'))
          const genre = root('.row strong', song).html()!
          
          const btn = root('.btn', song)
          const imageUrl = String(btn.attr('data-cover'))
          const name = String(btn.attr('data-track'))
          const songUrl = String(btn.attr('data-url'))
          const artistsEl = String(btn.attr('data-artist'))

          const artists: Artist[] = artistsEl
            ?.split(', ')
            .map((art: string) => {
              const artEl = parseHTML(art).querySelector('a')
              const url = artEl.getAttribute('href')!
              const name = artEl.innerHTML
              return new Artist(name, url)
            })
          return new Song(name, date, genre, artists, link, imageUrl, songUrl)
        })
        resolve(songs)
      })
      .catch(err => {
        reject(err)
      })
  })
}
