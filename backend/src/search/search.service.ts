import { Injectable } from '@nestjs/common'
import { Google } from './google'
import { GoogleResult } from './google-results'

@Injectable()
export class SearchService {
  // constructor(private readonly httpService: HttpService) {}

  // Find all Infotrack hosts - 1st 50pages
  // Transform it to a string of ranks
  // 1,2,5,49
  async search() {
    let data: GoogleResult[] = []
    const google = new Google()

    const searchResults = await google.search()

    for (let i = 0; i <= 4; i++) {
      data = data.concat(searchResults.data())
      searchResults.next()
    }

    data = this.filterInfoTrack(data)

    return this.condenseResults(data)
  }

  filterInfoTrack(data: GoogleResult[]) {
    return data.filter((d) => d.host.toLowerCase().includes('infotrack'))
  }

  condenseResults(data: GoogleResult[]): string {
    if (data.length == 0) {
      return '0'
    }

    return data.map((d) => d.rank).join(',')
  }
}
