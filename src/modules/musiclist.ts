import type Song from '../api/Song'
import { search } from './search'

export const getMusic = async (page = 0): Promise<Song[]> => {
    return search({}, page)
}
