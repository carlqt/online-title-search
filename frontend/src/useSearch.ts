import { useQuery } from "@tanstack/react-query"
import axios from "axios"

type Response = string

interface ErrorResponse {
  statusCode: number
  message: string
}

const searchRequest = async (service: string) => {
  const url = `http://localhost:3000/v2/search/${service}`

  const response = await axios.get<Response>(url)

  return response.data
}

export const useSearch = (service: string) => {
  return useQuery<string, ErrorResponse>(
    ["results"],
    async () => searchRequest(service),
    { enabled: false, refetchOnWindowFocus: false }
  )
}
