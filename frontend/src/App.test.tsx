import App from "./App"
import { render, fireEvent, screen } from "@testing-library/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
})

describe("App", () => {
  describe("when google is selected", () => {
    test("returns 1,8", async () => {
      render(
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      )

      const submitButton = screen.getByRole("button")
      fireEvent.click(submitButton)

      await screen.findByText("1,8")
    })
  })
})
