import { bingSearch } from "./bing"
import { googleSearch } from "./google"

export interface Result {
  rank: number;
  host: string;
}

export class NetworkRequestError extends Error {
  constructor(message: string | undefined) {
    super(message)
    this.name = 'NetworkRequestError'
  }
}

export const search = async (service: string) => {
  let result: Result[]

  try {
    if (service === 'google') {
      result = await googleSearch()
    } else {
      result = await bingSearch()
    }

    return result
      .filter(filterInfoTrack)
      .map(transformToRankList)
      .join(',') || '0'
  } catch (e) {
    if (e instanceof NetworkRequestError) {
      return e.message
    }

    throw e
  }
}

const filterInfoTrack = (data: Result) => {
  return data.host.toLowerCase().includes('infotrack')
}

const transformToRankList = (data: Result) => {
  return data.rank
}
