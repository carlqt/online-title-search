import { Injectable } from '@nestjs/common'
import { Google } from './google'
import { GoogleResult } from './google-results'
import { Bing } from './bing'

@Injectable()
export class SearchService {
  // constructor(private readonly httpService: HttpService) {}

  // Find all Infotrack hosts - 1st 50pages
  // Transform it to a string of ranks
  // 1,2,5,49

  // SearchService.search -> GoogleResults
  async search(service: string) {
    let searchResults
    let data = []

    if (service === 'bing') {
      searchResults = await new Bing().search()
    } else {
      searchResults = await new Google().search()
    }

    for (let i = 0; i <= 4; i++) {
      data = data.concat(searchResults.data())
      await searchResults.next()
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
