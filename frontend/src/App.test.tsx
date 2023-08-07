import App from "./App"
import userEvent from "@testing-library/user-event"
import { render, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

describe("App", () => {
  describe("when google is selected", () => {
    test("returns 1,2,3,4,5", async () => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      })

      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      )

      const submitButton = screen.getByRole("button")
      userEvent.click(submitButton)

      await screen.findByText("1,2,3,4,5")
    })
  })

  describe("when bing is selected", () => {
    test("returns 3,4,5", async () => {
      const queryClient = new QueryClient({
        defaultOptions: { queries: { retry: false } },
      })

      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      )

      userEvent.selectOptions(screen.getByRole("combobox"), "bing")

      const submitButton = screen.getByRole("button")
      userEvent.click(submitButton)

      await screen.findByText("3,4,5")
    })
  })
})
