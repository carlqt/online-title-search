interface Result {
  rank: number;
  host: string;
}

export const search = async (service: string) => {
  if (service === 'google') {
    const result = await googleSearch()

    return condenseResults(result)
  }

  return 'No Data'
}

const googleSearch = async (): Promise<Result[]> => {
  let googleResult: Result[] = []
  const baseUrl = 'http://localhost:3000'
  const path = (id: number) => {
    const pagePath = id.toString().padStart(2, '0')

    return `v1/search/google/${pagePath}`
  }

  // Make 5 requests to page
  for(let i = 0; i <= 4; i++) {
    const buildUrl = `${baseUrl}/${path(i + 1)}`
    const result = await fetch(buildUrl)
    const textResult = await result.text()
    const parser = new DOMParser()
    const document = parser.parseFromString(textResult, 'text/html')

    // Feed Response to the parser Type is HtmlList
    const parsedResponse = googleParser(document)
    googleResult = googleResult.concat(formatGoogleDocument(parsedResponse, i))
  }
  // Format the document response to Result[]
  // Filter only infotrack
  // Transform to SearchResult type
  console.log(googleResult)
  return googleResult.filter((d) => d.host.toLowerCase().includes('infotrack'))
}

const googleParser = (googleDocument: Document) => {
  const document = googleDocument.querySelectorAll('#search .g .r>a')
  return document
}

const formatGoogleDocument = (nodeList: NodeListOf<Element>, index: number) => {
  let result: Result[] = []

  nodeList.forEach((node, i) => {
    const newRank = (index * 10) + (i + 1)
    const url = new URL(node.getAttribute('href') || '')
    const host = url.host
    result = result.concat({ rank: newRank, host })
  })

  return result
}

const condenseResults = (data: Result[]): string => {
  if (data.length == 0) {
    return '0'
  }

  return data.map((d) => d.rank).join(',')
}
