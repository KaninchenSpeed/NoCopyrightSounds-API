import SongCache from '../helpers/SongCache'
import web from './web'
import { getMusic } from './musiclist'
import { search } from './search'
import { getArtistInfo } from './artist'

import type Artist from '../api/Artist'
import type { Filter } from './search'

export interface NCSClientOptions {
  web?: boolean
  proxy_url?: string
  use_cache?: boolean
  cache_path?: string
  detailed_log?: boolean
}

export default class NCSClient {
  private proxy_url: string
  private web: boolean
  private detailed_log: boolean
  protected cache: SongCache | undefined

  public constructor(options: NCSClientOptions = {}) {
    this.web = options.web ?? false
    this.proxy_url = options.proxy_url ?? ''
    this.detailed_log = options.detailed_log ?? false

    if (options.use_cache) {
      this.cache = new SongCache({
        web: this.web,
        proxy_url: this.proxy_url,
        cache_path: options.cache_path,
        detailed_log: this.detailed_log
      })
    }
  }

  public getCache(): SongCache | undefined {
    return this.cache
  }

  public async getSongs(page = 1) {
    if (this.cache) {
      const start = Math.max((page - 1) * 20, 0)
      return this.cache.songs.slice(
        start,
        Math.min(start + 20, this.cache.songs.length)
      )
    } else {
      if (this.web) {
        return await web.getSongs(this.proxy_url, page)
      } else {
        return await getMusic(page)
      }
    }
  }

  public async search(filter: Filter, page = 1) {
    if (this.cache && this.detailed_log) {
      console.warn(
        'This method is not cached! Use an alterate search engine insted like https://www.npmjs.com/package/flexsearch'
      )
    }
    if (this.web) {
      return await web.search(this.proxy_url, filter, page)
    } else {
      return await search(filter, page)
    }
  }

  public async getArtistInfo(artist_url: string | Artist) {
    if (this.cache && this.detailed_log) {
      console.warn('This method is not cached (coming soon)!')
    }
    if (this.web) {
      return await web.getArtistInfo(this.proxy_url, artist_url)
    } else {
      return await getArtistInfo(artist_url)
    }
  }
}
