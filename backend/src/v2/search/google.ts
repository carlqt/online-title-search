import * as https from 'https'
import axios, { AxiosInstance, isAxiosError } from 'axios'
import { GoogleResults } from './google-results'
import * as cheerio from 'cheerio'
import {
  InternalServerErrorException,
  ServiceUnavailableException,
} from '@nestjs/common'

const GOOGLE_URL = 'https://infotrack-tests.infotrack.com.au/Google'

export class Google {
  httpClient: AxiosInstance
  document: cheerio.CheerioAPI

  // Should we still do DI here?
  constructor() {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false })
    this.httpClient = axios.create({ httpsAgent })
  }

  // This should have a search string argument
  async search() {
    try {
      // Searching for the searchstring
      const response = await this.httpClient.get<string>(
        `${GOOGLE_URL}/Page01.html`,
      )

      this.document = cheerio.load(response.data)
      return new GoogleResults(this.document, this.httpClient)
    } catch (e) {
      if (isAxiosError(e)) {
        throw new ServiceUnavailableException(e)
      }

      throw new InternalServerErrorException(e)
    }
  }
}
