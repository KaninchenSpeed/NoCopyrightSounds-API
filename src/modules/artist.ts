import { JSDOM } from 'jsdom'
import axios from 'axios'
import parse_table from '../helpers/parseTable'

import type Artist from '../api/Artist'
import type Song from '../api/Song'
import type Artist_info from '../api/ArtistInfo'

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
    const img = info_el.querySelector<HTMLDivElement>('.img')
        ? info_el
              .querySelector<HTMLDivElement>('.img')!
              .getAttribute('style')!
              .trim()
              .replace("url('", '')
              .replace("')", '')
        : undefined

    const fearured_el = document.querySelector('.featured tbody')
    const featured: Song[] = !fearured_el ? [] : parse_table(fearured_el)

    const songs_el = fearured_el
        ? document.querySelectorAll('.table tbody')[1]
        : document.querySelector('.table tbody')!
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
