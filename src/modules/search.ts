import fetch from 'node-fetch'
import { parse as parseHTML } from 'node-html-parser'
import type { HTMLElement } from 'node-html-parser'
import cheerio from 'cheerio'

import Artist from '../classes/artist'
import Song from '../classes/song'

export interface Filter {
  genre?: number
  mood?: number
  search?: string
}

export const search = (filter: Filter, page = 1): Promise<Song[]> => {
  return new Promise<Song[]>((resolve, reject) => {
    fetch(`https://ncs.io/music-search?page=${page}${filter.genre ? `&genre=${filter.genre}` : ''}${filter.mood ? `&mood=${filter.mood}` : ''}${filter.search ? `&q=${filter.search}` : ''}`)
      .then(res => res.text())
      .then(html => {
        const root = cheerio.load(html)
        const table = root('.tablesorter tbody')
        const songsHtml = root(table, 'tr').toArray()
        const songs: Song[] = songsHtml.map(song => {
          const [ player_col, genre_col, img_col, main_col, tags_col, date_col, tracks_col, _ ] = root('td', song).toArray()
          
          const link = root('a', main_col).attr('href')!
          
          const date_raw = root('td[style="width:15%;"]', song).filter(i => i == 1).html()!
          const date_d = new Date(date_raw)
          const date = `${date_d.getFullYear()}-${date_d.getMonth()}-${date_d.getDate()}`
          const genre = root('.genre', genre_col).attr('title')!
          
          const player = root('.player-play', player_col)
          const imageUrl = String(player.attr('data-cover')).replace(
            /100x100/g,
            '325x325'
            )
          const name = String(player.attr('data-track'))
          const songUrl = String(player.attr('data-url'))
          const artistsEl = String(player.attr('data-artist'))
            
          const artists: Artist[] = artistsEl
            ?.split(', ')
            .map((art: string) => {
              const artEl = parseHTML(art.replace(/'/g, '"')).querySelector('a')
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
