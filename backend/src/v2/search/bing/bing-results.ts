import * as cheerio from 'cheerio'
import { BaseResult, Result } from '../base'

export class BingResults extends BaseResult {
  path = 'Bing'

  data(): Result[] {
    const resultElements = this.document('#b_results li.b_algo h2 > a').get()

    return resultElements.map(this.transformToResult)
  }

  transformToResult = (el: cheerio.Element, index: number): Result => {
    const url = new URL(el.attribs['href'] || '')
    const offset =
      this.currentPage <= 2
        ? (this.currentPage - 1) * 7
        : (this.currentPage - 1) * 10 - 3
    const rank = offset + index + 1

    return { rank, host: url.host }
  }
}
