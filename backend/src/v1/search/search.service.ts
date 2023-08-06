import { Injectable } from '@nestjs/common'
import axios from 'axios'
import * as https from 'https'

@Injectable()
export class SearchService {
  // constructor(private readonly httpService: HttpService) {}

  async search(pageNum: string) {
    const url = `https://infotrack-tests.infotrack.com.au/Google/Page${pageNum}.html`

    const httpsAgent = new https.Agent({ rejectUnauthorized: false })
    const axiosInstance = axios.create({ httpsAgent })
    const resp = await axiosInstance.get<string>(url)

    return resp.data
  }
}
