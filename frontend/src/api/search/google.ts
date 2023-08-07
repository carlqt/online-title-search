import { NetworkRequestError } from "./search"

// [[carl],[will, json],[tablante]] => [{id: 1, name: carl}, {id: 2, name: will}, {id:3, name:json}, tablante]

const BASE_URL = 'http://localhost:3000'

// No of requests we want to make to reach 50 search items
const NO_OF_REQUESTS = 5

export const googleSearch = async () => {
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
