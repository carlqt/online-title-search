import { Controller, Get, Param } from '@nestjs/common'
import { SearchService } from './search.service'

@Controller()
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Get('/search')
  async index(): Promise<string> {
    const results = await this.searchService.search()

    return results
  }

  @Get('/search/:service')
  show(@Param() params: Record<string, string>): string {
    return `Search ${params.service}`
  }
}
