import { useState } from "react"
import "./App.css"
import { useSearch } from "./useSearch"

function App() {
  const [service, setService] = useState("google")
  const [searchString, setSearchString] = useState("")
  const { data, isFetching, isError, error, refetch } = useSearch(service)

  const options = [
    { value: "google", text: "Google" },
    { value: "bing", text: "Bing" },
  ]

  const formSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    refetch()
  }

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    setSearchString(event.currentTarget.value)
  }

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setService(event.currentTarget.value)
  }

  const resultDisplay = () => {
    if (isFetching) {
      return "LOADING"
    }

    if (isError) {
      return error.message
    }

    return data
  }

  return (
    <>
      <div className="container mx-auth h-screen mt-10">
        <div className="flex items-center justify-center ">
          <form
            className="flex border-2 border-gray-200 rounded"
            onSubmit={formSubmit}
          >
            <select
              id="service"
              value={service}
              onChange={handleSelect}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              {options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.text}
                </option>
              ))}
            </select>
            <input
              value={searchString}
              onChange={handleSearchInput}
              type="text"
              className="px-4 py-2 w-80"
              placeholder="Search..."
            />
            <button className="px-4 text-white bg-gray-600 border-l">
              Search
            </button>
          </form>
        </div>

        <div>
          <h1>{resultDisplay()}</h1>
        </div>
      </div>
    </>
  )
}

export default App
