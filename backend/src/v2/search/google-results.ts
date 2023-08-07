import * as cheerio from 'cheerio'
import { BaseResult, Result } from './base'

export class GoogleResults extends BaseResult {
  path = 'Google'

  data(): Result[] {
    const resultElements = this.document('#search .g .r>a').get()

    return resultElements.map(this.transformToResult)
  }

  transformToResult = (el: cheerio.Element, index: number): Result => {
    const url = new URL(el.attribs['href'] || '')
    const offset = (this.currentPage - 1) * 10
    const rank = offset + index + 1

    return { rank, host: url.host }
  }
}
