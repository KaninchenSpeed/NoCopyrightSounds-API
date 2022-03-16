import { JSDOM } from 'jsdom'
import axios from 'axios'

import Artist from '../classes/artist'
import Song from '../classes/song'

export interface Filter {
  genre?: number
  mood?: number
  search?: string
}

export const search = async (filter: Filter, page = 1): Promise<Song[]> => {
  const { data: html } = await axios.get<string>(`https://ncs.io/music-search?page=${page}${
    filter.genre ? `&genre=${filter.genre}` : ''
  }${filter.mood ? `&mood=${filter.mood}` : ''}${
    filter.search ? `&q=${filter.search}` : ''
  }`, {
    responseType: 'text'
  })
  const dom = new JSDOM(html)
  const document = dom.window.document
  const table = document.querySelector('.tablesorter tbody')!
  const song_els = table.querySelectorAll('tr')
  const songs: Song[] = Array.from(song_els).map(el => {
    const [
      player_col,
      genre_col,
      img_col,
      main_col,
      tags_col,
      date_col,
      tracks_col,
      _
    ] = Array.from(el.querySelectorAll('td'))

    const url = main_col.querySelector('a')!.href
    const date_obj = new Date(el.querySelectorAll('td[style="width:15%;"]')[1].innerHTML)
    const date = `${date_obj.getFullYear()}-${date_obj.getMonth()}-${date_obj.getDate()}`
    const genre = genre_col.querySelector('.genre')!.getAttribute('title')!

    const player = player_col.querySelector('.player-play')!
    const cover = player.getAttribute('data-cover')!.replace(
      /100x100/g,
      '325x325'
    )
    const name = player.getAttribute('data-track')!
    const song_url = player.getAttribute('data-url')!

    const artists_el = player.getAttribute('data-artist')!
    const artists: Artist[] = artists_el.split(', ').map(art => {
      const art_el = new JSDOM(art).window.document.querySelector('a')!
      const url = art_el.getAttribute('href')!
      const name = art_el.innerHTML
      return new Artist(name, url)
    })

    return new Song(name, date, genre, artists, url, cover, song_url)
  })
  return songs
}
