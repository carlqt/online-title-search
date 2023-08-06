export const infoTracker = (htmlString: string): string => {
  const parser = new DOMParser()
  const document = parser.parseFromString(htmlString, 'text/html')

  const results = document.querySelectorAll('#search .g .r>a')[0].getAttribute('href')

  console.log(results)

  return 'No data yet'
}
