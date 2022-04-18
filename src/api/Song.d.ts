import type Artist from './Artist'
import type Tag from './Tag'

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
