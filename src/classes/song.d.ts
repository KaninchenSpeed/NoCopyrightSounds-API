import type Artist from './artist'

export default interface Song {
  name: string
  date: string
  genre: string
  artists: Artist[]
  url: string
  imageUrl: string
  songUrl: string
}
