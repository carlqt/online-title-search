import { AxiosInstance } from 'axios'
import * as cheerio from 'cheerio'

export class PageOutOfBoundsError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PageOutOfBoundsError'
  }
}

export interface Result {
  rank: number // Ranking
  host: string // The domain
}

export class BaseResult {
  pages = 10
  perPage = 10
  currentPage = 1
  baseUrl = 'https://infotrack-tests.infotrack.com.au'
  path = ''
  document: cheerio.CheerioAPI
  httpClient: AxiosInstance

  constructor(document: cheerio.CheerioAPI, httpClient: AxiosInstance) {
    this.document = document
    this.httpClient = httpClient
  }

  async next() {
    if (this.currentPage + 1 > this.pages) {
      throw new PageOutOfBoundsError('End of page')
    }

    this.currentPage += 1

    const response = await this.httpClient.get<string>(
      this.nextPageUrl(this.currentPage),
    )
    this.document = cheerio.load(response.data)
  }

  nextPageUrl(page: number) {
    const pageString = page.toString()
    const pageNumber = pageString.padStart(2, '0')

    return `${this.baseUrl}/${this.path}/Page${pageNumber}.html`
  }
}
