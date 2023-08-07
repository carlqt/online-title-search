import { Injectable } from '@nestjs/common'
import { Google } from './google'
import { Bing } from './bing'
import { Result } from './base'

interface ISearchResults {
  next(): Promise<void>
  data(): Result[]
}

@Injectable()
export class SearchService {
  // constructor(private readonly httpService: HttpService) {}

  async search(service: string): Promise<string> {
    let searchResults: ISearchResults
    let data: Result[] = []

    if (service === 'bing') {
      searchResults = await new Bing().search()
    } else {
      searchResults = await new Google().search()
    }

    for (let i = 0; i <= 4; i++) {
      data = data.concat(searchResults.data())
      await searchResults.next()
    }

    return (
      data
        .filter(this.filterInfoTrack)
        .map(this.transformToRankList)
        .join(',') || '0'
    )
  }

  filterInfoTrack(data: Result) {
    return data.host.toLowerCase().includes('infotrack')
  }

  transformToRankList(data: Result) {
    return data.rank
  }
}
