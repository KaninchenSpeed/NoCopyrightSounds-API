import type Artist from './Artist'
import type Tag from './Tag'

export default interface Song {
    name: string
    date: Date
    genre?: string
    artists: Artist[]
    url: string
    coverUrl?: string
    previewUrl?: string
    id: string
    download: {
        regular?: string
        instrumental?: string
    }
    tags: Tag[]
}
