import { AxiosInstance } from 'axios'
import * as cheerio from 'cheerio'

const GOOGLE_URL = 'https://infotrack-tests.infotrack.com.au/Google'

export class PageOutOfBoundsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PageOutOfBoundsError'
  }
}

export interface GoogleResult {
  rank: number // Ranking
  host: string // The domain
  // page: number // the page where it is found
}

export class GoogleResults {
  pages = 10
  perPage = 10
  currentPage = 1
  #document: cheerio.CheerioAPI
  #httpClient: AxiosInstance

  constructor(document: cheerio.CheerioAPI, httpClient: AxiosInstance) {
    this.#document = document
    this.#httpClient = httpClient
  }

  data(): GoogleResult[] {
    const resultElements = this.#document('#search .g .r>a').get()

    return resultElements.map(this.transformToResult)
  }

  transformToResult = (el: cheerio.Element, index: number): GoogleResult => {
    const url = new URL(el.attribs['href'] || '')
    const offset = (this.currentPage - 1) * 10
    const rank = offset + index + 1

    return { rank, host: url.host }
  }

  async next() {
    if (this.currentPage + 1 > this.pages) {
      throw new PageOutOfBoundsError('End of page')
    }

    this.currentPage += 1

    const response = await this.#httpClient.get<string>(
      this.nextPageUrl(this.currentPage),
    )
    this.#document = cheerio.load(response.data)
  }

  nextPageUrl(page: number) {
    const pageString = page.toString()
    const pageNumber = pageString.padStart(2, '0')

    return `${GOOGLE_URL}/Page${pageNumber}.html`
  }
}
