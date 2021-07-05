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
export default class Song {
  constructor(
    name: string,
    date: string,
    genre: string,
    artists: Artist[],
    url: string,
    imageUrl: string,
    songUrl: string
  ) {
    this.name = name
    this.date = date
    this.genre = genre
    this.artists = artists
    this.url = url
    this.imageUrl = imageUrl
    this.songUrl = songUrl
  }
}
