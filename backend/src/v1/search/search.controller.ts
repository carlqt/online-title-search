import { Controller, Get, Param } from '@nestjs/common'
import { SearchService } from './search.service'
import { SearchParams } from './dto/search-params'

@Controller({ version: '1' })
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/search')
  async index(): Promise<string> {
    const results = await this.searchService.search('01')

    return results
  }

  @Get('/search/:service/:page')
  async show(@Param() params: SearchParams): Promise<string> {
    if (params.service == 'bing') {
      return this.searchService.searchBing(params.page)
    }

    return this.searchService.search(params.page)
  }
}
