import { IsEnum } from 'class-validator'

enum serviceEnum {
  bing = 'bing',
  google = 'google',
}

export class SearchParams {
  @IsEnum(serviceEnum)
  service: 'google' | 'bing'
  page: string
}
