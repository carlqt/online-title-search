import { Controller, Get, Param } from '@nestjs/common'
import { SearchService } from './search.service'

@Controller({ version: '2' })
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/search')
  async index(): Promise<string> {
    const results = await this.searchService.search('google')

    return results
  }

  @Get('/search/:service')
  show(@Param() params: Record<string, string>) {
    return this.searchService.search(params.service)
  }
}
