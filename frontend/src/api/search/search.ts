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

  return result
    .filter(filterInfoTrack)
    .map(transformToRankList)
    .join(',') || '0'
}

const filterInfoTrack = (data: Result) => {
  return data.host.toLowerCase().includes('infotrack')
}

const transformToRankList = (data: Result) => {
  return data.rank
}
