import type Artist from './Artist'
import type Song from './Song'

export default interface Artist_info extends Artist {
    img?: string
    genres: string[]
    featured: Song[]
    songs: Song[]
}
