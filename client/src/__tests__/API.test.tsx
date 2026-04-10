/**
  Test calls to the actual API.  Backend server must be running!
 */

import { render, screen, waitFor } from "@testing-library/react"
import App from "@/App"

// todo - RESOLVE ERROR.  I think it's due to vite proxy not working during test?
test.skip("App API functions", async () => {
  render(<App />)
  await waitFor(() => {
  expect(screen.queryByRole("button", {name: /add to cart/i})).toBeInTheDocument()
  })

})