import { JSDOM } from 'jsdom'
import axios from 'axios'
import parse_table from '../helpers/parse_table'

import type Song from '../api/Song'

export interface Filter {
  genre?: number
  mood?: number
  search?: string
}

export const search = async (filter: Filter, page = 1): Promise<Song[]> => {
  const { data: html } = await axios.get<string>(
    `https://ncs.io/music-search?page=${page}${
      filter.genre ? `&genre=${filter.genre}` : ''
    }${filter.mood ? `&mood=${filter.mood}` : ''}${
      filter.search ? `&q=${filter.search}` : ''
    }`,
    {
      responseType: 'text'
    }
  )
  const dom = new JSDOM(html)
  const document = dom.window.document
  const table = document.querySelector('.tablesorter tbody')!
  const songs = parse_table(table)
  return songs
}
