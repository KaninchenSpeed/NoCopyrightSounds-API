export default interface Artist {
    name: string
    url: string
}
export default class Artist {
    constructor(name: string, url: string) {
        this.name = name
        this.url = url
    }
}