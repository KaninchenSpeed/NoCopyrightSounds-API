import type Song from '../api/Song'
import { search } from './search'

export const getMusic = async (page = 1): Promise<Song[]> => {
    return search({}, page)
}
