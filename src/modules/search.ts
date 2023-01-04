import { JSDOM } from 'jsdom'
import axios from 'axios'
import parseTable from '../helpers/parseTable'

import { Genre, Mood } from '../helpers/enums'
import type Song from '../api/Song'

export interface Filter {
    genre?: Genre
    mood?: Mood
    search?: string
    version?: 'regular' | 'instrumental' | 'both'
}

export const search = async (filter: Filter, page = 0): Promise<Song[]> => {
    const { data: html } = await axios.get<string>(
        `https://ncs.io/music-search?page=${page + 1}${
            filter.genre ? `&genre=${filter.genre}` : ''
        }${filter.mood ? `&mood=${filter.mood}` : ''}${filter.search ? `&q=${filter.search}` : ''}${
            filter.version
                ? `&version=${filter.version == 'both' ? 'regular-instrumental' : filter.version}`
                : ''
        }`,
        {
            responseType: 'text'
        }
    )
    const dom = new JSDOM(html)
    const document = dom.window.document
    const table = document.querySelector('.tablesorter tbody')!
    const songs = parseTable(table)
    return songs
}
