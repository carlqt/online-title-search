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
  let nodeList: NodeListOf<Element>[]

  try {
    if (service === 'google') {
      nodeList = await googleSearch()
    } else {
      nodeList = await bingSearch()
    }

    return nodeList
      .reduce(transformToResult, [])
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

const transformToResult = (memo: Result[], nodeList: NodeListOf<Element>) => {
  nodeList.forEach((node) => {
    const url = new URL(node.getAttribute('href') || '')
    const rank = memo.length + 1

    memo = memo.concat({ rank, host: url.host })
  })

  return memo
}

