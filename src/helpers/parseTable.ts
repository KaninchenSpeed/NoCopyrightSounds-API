import { JSDOM } from 'jsdom'

import type Song from '../api/Song'
import type Artist from '../api/Artist'
import type Tag from '../api/Tag'

export default (table: Element): Song[] => {
    if (!table) return []

    const rows = table.querySelectorAll('tr')
    const songs = Array.from(rows).map<Song>((row) => {
        const [playerCol, genreCol, imgCol, mainCol, tagsCol, dateCol, tracksCol, downloadCol] =
            Array.from(row.querySelectorAll('td'))

        const url = mainCol.querySelector('a')!.href
        const date = new Date(row.querySelectorAll('td[style="width:15%;"]')[1].innerHTML)
        const genre = genreCol.querySelector('.genre')!.getAttribute('title') || undefined

        const player = playerCol.querySelector('.player-play')!
        const coverUrl = player.getAttribute('data-cover')?.replace(/100x100/g, '325x325')
        const name = player.getAttribute('data-track')!
        const previewUrl = player.getAttribute('data-url') || undefined
        const songId = player.getAttribute('data-tid')!

        const artistsEl = player.getAttribute('data-artist')
        const artists: Artist[] = artistsEl
            ? artistsEl.split(', ').map((artist) => {
                  const artistEl = new JSDOM(artist).window.document.querySelector('a')!
                  const url = artistEl.getAttribute('href')!
                  const name = artistEl.innerHTML
                  return { name, url }
              })
            : []

        const tags_els = tagsCol.querySelectorAll('a')
        const tags = Array.from(tags_els)
            .map<Tag>((el) => {
                const name = el.innerHTML
                const css = el.style.backgroundColor
                const [r, g, b] = css
                    .replace('rgb(', '')
                    .replace(')', '')
                    .split(', ')
                    .map((v) => Number(v))
                const url = el.href
                const mood = url.split('?')[1].replace('mood=', '')
                return {
                    name,
                    color: { r, g, b },
                    mood: Number(mood)
                }
            })
            .filter((tag) => !Number.isNaN(tag.mood))

        const availableTypes = tracksCol.innerHTML.toLowerCase()

        return {
            name,
            url,
            date,
            id: songId,
            genre,
            artists,
            coverUrl: coverUrl?.includes('/static/web/img/no-track.png') ? undefined : coverUrl,
            previewUrl,
            tags,
            download: {
                regular: availableTypes.includes('regular')
                    ? `https://ncs.io/track/download/${songId}`
                    : undefined,
                instrumental: availableTypes.includes('instrumental')
                    ? `https://ncs.io/track/download/i_${songId}`
                    : undefined
            }
        }
    })
    return songs
}
