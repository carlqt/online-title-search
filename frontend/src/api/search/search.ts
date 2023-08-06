import { googleSearch } from "./google"

export interface Result {
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

const condenseResults = (data: Result[]): string => {
  if (data.length == 0) {
    return '0'
  }

  return data.map((d) => d.rank).join(',')
}
