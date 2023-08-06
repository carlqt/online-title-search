import { Controller, Get, Param } from '@nestjs/common'
import { SearchService } from './search.service'

@Controller({ version: '1' })
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/search')
  async index(): Promise<string> {
    const results = await this.searchService.search('01')

    return results
  }

  @Get('/search/:service')
  async show(@Param() params: Record<string, string>): Promise<string> {
    if (params.service == 'bing') {
      return this.searchService.searchBing('01')
    }

    return this.searchService.search('01')
  }
}
