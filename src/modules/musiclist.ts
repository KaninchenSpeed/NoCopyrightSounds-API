import { JSDOM } from 'jsdom'
import axios from 'axios'

import Artist from '../classes/artist'
import Song from '../classes/song'

export const getMusic = async (page?: number): Promise<Song[]> => {
  const { data: html } = await axios.get<string>(
    `https://ncs.io/music?page=${page ? page : 1}`,
    {
      responseType: 'text'
    }
  )

  const dom = new JSDOM(html)
  const document = dom.window.document.body

  const song_els = document.querySelectorAll('div.col-lg-2.item')
  const songs = Array.from(song_els).map(song_el => {
    const img_link_el = song_el.querySelector<HTMLAnchorElement>('a[href]')!
    const url = img_link_el.href

    const info_el = song_el.querySelector('.col-6')!
    const date_el = info_el.querySelector('p[title]')!
    const [ year, month, day ] = date_el.getAttribute('title')!.split('-').map(v => Number(v))
    const date_obj = new Date() //for future api interface
    date_obj.setFullYear(year, month, day)
    const date = `${date_obj.getFullYear()}-${date_obj.getMonth()}-${date_obj.getDate()}`
    const genre = info_el.querySelector('span strong')?.innerHTML!
    
    const player = song_el.querySelector('.btn')!
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
      return new Artist(name, url)
    })

    return new Song(name, date, genre, artists, url, cover, song_url)
  })
  return songs
}
