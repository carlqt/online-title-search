import { Result } from "./search"

const BASE_URL = 'http://localhost:3000'

export const googleSearch = async (): Promise<Result[]> => {
  let documentCollection: Document[] = []

  // Make 5 requests to page
  const parser = new DOMParser()

  for(let i = 0; i <= 4; i++) {
    const result = await googleSearchRequest(requestUrl(i+1))
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

  return `${BASE_URL}/v1/search/google/${pagePath}`
}

const googleSearchRequest = async (url: string) => {
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

const transformToNodeList = (googleDocument: Document) => {
  return googleDocument.querySelectorAll('#search .g .r>a')
}

const transformToResult = (nodeList: NodeListOf<Element>, index: number) => {
  let result: Result[] = []

  nodeList.forEach((node, i) => {
    const newRank = (index * 10) + (i + 1)
    const url = new URL(node.getAttribute('href') || '')
    const host = url.host
    result = result.concat({ rank: newRank, host })
  })

  return result
}
