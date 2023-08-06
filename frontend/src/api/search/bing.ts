import { Result } from "./search"

const BASE_URL = 'http://localhost:3000'

// No of requests we want to make to reach 50 search items
const NO_OF_REQUESTS = 5

export const bingSearch = async (): Promise<Result[]> => {
  let documentCollection: Document[] = []

  // Make requests until documentCollection is 50
  const parser = new DOMParser()

  for(let i = 0; i <= NO_OF_REQUESTS; i++) {
    const result = await bingSearchRequest(requestUrl(i+1))
    const document = parser.parseFromString(result, 'text/html')

    documentCollection = documentCollection.concat(document)
  }

  return documentCollection
    .map(transformToNodeList)
    .flatMap(transformToResult)
    .filter(filterInfoTrack)
}

const requestUrl = (id: number) => {
  const pagePath = id.toString().padStart(2, '0')

  return `${BASE_URL}/v1/search/bing/${pagePath}`
}

const bingSearchRequest = async (url: string) => {
  const result = await fetch(url)

  if (result.ok) {
    if (result.status >= 200 && result.status <= 299) {
      return await result.text()
    }
  }

  throw new Error('Request failed')
}

const filterInfoTrack = (data: Result) => {
  return data.host.toLowerCase().includes('infotrack')
}

const transformToNodeList = (document: Document) => {
  return document.querySelectorAll('#b_results li.b_algo h2 > a')
}

const transformToResult = (nodeList: NodeListOf<Element>, index: number) => {
  let result: Result[] = []
  const offset = index <= 1 ? (index * 7) : (index * 10 - 3)

  nodeList.forEach((node, i) => {
    const rank = offset + i + 1
    const url = new URL(node.getAttribute('href') || '')
    const host = url.host
    result = result.concat({ rank, host })
  })

  return result
}
