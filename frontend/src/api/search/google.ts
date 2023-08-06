import { NetworkRequestError, Result } from "./search"

const BASE_URL = 'http://localhost:3000'

// No of requests we want to make to reach 50 search items
const NO_OF_REQUESTS = 5

export const googleSearch = async (): Promise<Result[]> => {
  let documentCollection: Document[] = []

  // Make requests until documentCollection is 50
  const parser = new DOMParser()

  for(let i = 0; i < NO_OF_REQUESTS; i++) {
    const result = await googleSearchRequest(requestUrl(i+1))
    const document = parser.parseFromString(result, 'text/html')

    documentCollection = documentCollection.concat(document)
  }

  return documentCollection
    .map(transformToNodeList)
    .flatMap(transformToResult)
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

  throw new NetworkRequestError('Request failed')
}

const transformToNodeList = (googleDocument: Document) => {
  return googleDocument.querySelectorAll('#search .g .r>a')
}

const transformToResult = (nodeList: NodeListOf<Element>, index: number) => {
  let result: Result[] = []
  const offset = index * 10

  nodeList.forEach((node, i) => {
    const rank = offset + i + 1
    const url = new URL(node.getAttribute('href') || '')
    const host = url.host
    result = result.concat({ rank, host })
  })

  return result
}
