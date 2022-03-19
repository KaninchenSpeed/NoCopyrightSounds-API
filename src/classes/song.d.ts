import type Artist from './artist'
import type Tag from './tag'

export default interface Song {
  name: string
  date: string
  genre: string
  artists: Artist[]
  url: string
  imageUrl: string
  songUrl: string
  tags?: Tag[]
}
