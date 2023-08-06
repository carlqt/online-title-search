import { bingSearch } from "./bing"
import { googleSearch } from "./google"

export interface Result {
  rank: number;
  host: string;
}

export const search = async (service: string) => {
  let result: Result[]

  if (service === 'google') {
    result = await googleSearch()
  } else {
    result = await bingSearch()
  }

  return condenseResults(result)
}

const condenseResults = (data: Result[]): string => {
  if (data.length == 0) {
    return '0'
  }

  return data.map((d) => d.rank).join(',')
}
