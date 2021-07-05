import fetch from 'node-fetch'
import { parse as parseHTML } from 'node-html-parser'
import type { HTMLElement } from 'node-html-parser'

import Artist from '../classes/artist'
import Song from '../classes/song'

export interface Filter {
  genre?: number
  mood?: string
  search?: string
}

export const search = (filter: Filter, page?: number): Promise<Song[]> => {
  return new Promise<Song[]>((resolve, reject) => {
    fetch(
      `https://ncs.io/music-search?page=${page ? page : 1}${
        filter.genre ? `&genre=${filter.genre}` : ''
      }${filter.mood ? `&mood=${filter.mood}` : ''}${
        filter.search ? `&q=${filter.search}` : ''
      }`
    )
      .then(res => res.text())
      .then(html => {
        const root = parseHTML(html)
        const songsHtml = root.querySelectorAll('div.col-lg-2.item')
        const songs: Song[] = songsHtml.map((song: HTMLElement) => {
          const link = song.querySelector('a[href]').getAttribute('href')
          const imageUrl = song
            .querySelector('div.img[style]')
            .getAttribute('style')
            ?.split("'")[1]
          const name = song.querySelector('.bottom p strong').innerHTML
          const optionsEl = song.querySelector('div.options')
          const date = optionsEl.querySelector('p[title]').getAttribute('title')
          const genre = optionsEl.querySelector('strong').innerHTML
          const songLinkEl = optionsEl.querySelector('a.btn.black.player-play')
          const songUrl = songLinkEl.getAttribute('data-url')
          const artistsEl = songLinkEl.getAttribute('data-artist')

          if (!artistsEl || !name || !date || !link || !imageUrl || !songUrl)
            return new Song('', '', '', [], '', '', '')
          const artists: Artist[] = artistsEl
            ?.split(', ')
            .map((art: string) => {
              const artEl = parseHTML(art)
              const url = artEl.getAttribute('href')
              const name = artEl.innerHTML
              if (!url) return new Artist(name, '')
              else return new Artist(name, url)
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
