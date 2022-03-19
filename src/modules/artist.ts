import { JSDOM } from 'jsdom'
import axios from 'axios'
import parse_table from '../helpers/parse_table'

import type Artist from '../classes/artist'
import type Song from '../classes/song'

interface Artist_info extends Artist {
  img: string
  genres: string[]
  featured: Song[]
  songs: Song[]
}

export const getArtistInfo = async (
  artist_url: string | Artist
): Promise<Artist_info> => {
  if (typeof artist_url != 'string') artist_url = artist_url.url
  const { data: html } = await axios.get<string>(
    `https://ncs.io${artist_url}`,
    {
      responseType: 'text'
    }
  )

  const dom = new JSDOM(html)
  const document = dom.window.document.body

  const info_el = document.querySelector('.details .info')!
  const name = info_el.querySelector('h5')!.innerHTML
  const genres = info_el.querySelector('.tags')!.innerHTML.split(', ')
  const img = info_el.querySelector<HTMLDivElement>('.img')!.style.backgroundImage.trim().replace("url('", '').replace("')", '')

  const fearured_el = document.querySelector('.featured tbody')
  const featured: Song[] = !fearured_el ? [] : parse_table(fearured_el)

  const songs_el = document.querySelectorAll('.table tbody')[1]
  const songs: Song[] = parse_table(songs_el)

  return {
    name,
    url: artist_url,
    img,
    genres,
    featured,
    songs
  }
}
