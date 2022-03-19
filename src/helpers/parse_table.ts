import { JSDOM } from 'jsdom'

import type Song from '../classes/song'
import type Artist from '../classes/artist'

export default (table: Element) => {
  const rows = table.querySelectorAll('tr')
  const songs = Array.from(rows).map(el => {
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
    const date_obj = new Date(
      el.querySelectorAll('td[style="width:15%;"]')[1].innerHTML
    )
    const date = `${date_obj.getFullYear()}-${date_obj.getMonth()}-${date_obj.getDate()}`
    const genre = genre_col.querySelector('.genre')!.getAttribute('title')!

    const player = player_col.querySelector('.player-play')!
    const cover = player
      .getAttribute('data-cover')!
      .replace(/100x100/g, '325x325')
    const name = player.getAttribute('data-track')!
    const song_url = player.getAttribute('data-url')!

    const artists_el = player.getAttribute('data-artist')!
    const artists: Artist[] = artists_el.split(', ').map(art => {
      const art_el = new JSDOM(art).window.document.querySelector('a')!
      const url = art_el.getAttribute('href')!
      const name = art_el.innerHTML
      return { name, url }
    })

    return {
      name,
      url,
      date,
      genre,
      artists,
      imageUrl: cover,
      songUrl: song_url
    }
  })
  return songs
}