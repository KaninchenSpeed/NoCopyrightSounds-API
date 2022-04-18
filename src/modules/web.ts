import axios from 'axios'

import type Song from '../api/Song'
import type Artist from '../api/Artist'
import type Artist_info from '../api/Artist_info'
import type { Filter } from './search'

export const getSongs = async (proxy_url: string, page = 1) => {
    const { data } = await axios.get<Song[]>(`${proxy_url}/songs?page=${page}`)
    return data
}

export const search = async (proxy_url: string, filter: Filter, page = 1) => {
    const { data } = await axios.get<Song[]>(`${proxy_url}/search?page=${page}${filter.search ? `&search=${filter.search}` : ''}${filter.genre ? `&genre=${filter.genre}` : ''}${filter.mood ? `&mood=${filter.mood}` : ''}`)
    return data
}

export const getArtistInfo = async (proxy_url: string, artist_url: string | Artist) => {
    if (typeof artist_url != 'string') artist_url = artist_url.url
    const { data } = await axios.get<Artist_info>(`${proxy_url}/artist/${encodeURIComponent(artist_url)}`)
    return data
}

export default {
    getSongs,
    search,
    getArtistInfo
}