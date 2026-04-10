import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"

import EditableProduct from "@/features/EditableProduct"

const MOCK_PRODUCT = {
  _id: "69d6c254ac3984a29e4e2abb",
  title: "Garden Glovez",
  price: 12.99,
  quantity: 86,
  createdAt: "2026-04-08T21:02:12.222Z",
  updatedAt: "2026-04-09T21:37:55.077Z",
  __v: 0,
}

test("Edit form is not shown at start", () => {
  render(
    <EditableProduct
      product={MOCK_PRODUCT}
      onSubmit={vi.fn()}
      onDelete={vi.fn()}
      onAddToCart={vi.fn()}
    />
  )
  expect(screen.queryAllByRole("button").length).toBeGreaterThan(0)
  expect(screen.queryAllByRole("textbox").length).toBe(0)
})

test("Form appears after you click 'Edit'", () => {
  // const user = userEvent.setup()
  // // render() 
  // #LOA
})
