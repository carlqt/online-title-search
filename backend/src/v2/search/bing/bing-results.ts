import { AxiosInstance } from 'axios'
import * as cheerio from 'cheerio'

const BING_URL = 'https://infotrack-tests.infotrack.com.au/Bing'

export class PageOutOfBoundsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PageOutOfBoundsError'
  }
}

export interface BingResult {
  rank: number // Ranking
  host: string // The domain
  // page: number // the page where it is found
}

export class BingResults {
  pages = 10
  perPage = 10
  currentPage = 1
  #document: cheerio.CheerioAPI
  #httpClient: AxiosInstance

  constructor(document: cheerio.CheerioAPI, httpClient: AxiosInstance) {
    this.#document = document
    this.#httpClient = httpClient
  }

  data(): BingResult[] {
    const resultElements = this.#document('#b_results li.b_algo h2 > a').get()

    return resultElements.map(this.transformToResult)
  }

  transformToResult = (el: cheerio.Element, index: number): BingResult => {
    const url = new URL(el.attribs['href'] || '')
    const offset =
      this.currentPage <= 2
        ? (this.currentPage - 1) * 7
        : (this.currentPage - 1) * 10 - 3
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

    return `${BING_URL}/Page${pageNumber}.html`
  }
}
