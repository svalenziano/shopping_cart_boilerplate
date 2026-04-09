import { render, screen } from "@testing-library/react"

import { AddEditProductForm } from "@/features/AddEditProductForm"
import userEvent from "@testing-library/user-event"

const MOCK_PRODUCT = {
  _id: "69d6c253ac3984a29e4e2ab9",
  title: "Watering Can",
  price: 19.99,
  quantity: 99,
  createdAt: "2026-04-08T21:02:11.029Z",
  updatedAt: "2026-04-09T19:52:27.916Z",
  __v: 0,
}

/**
 ADD -> No product is provided
 */
function AddProductForm() {
  return (
    <AddEditProductForm
      cancelButton={vi.fn()}
      onDelete={vi.fn()}
      onSubmit={vi.fn()}
    />
  )
}

/**
 EDIT -> A product is provided
 */
function EditProductForm() {
  return (
    <AddEditProductForm
      product={MOCK_PRODUCT}
      cancelButton={vi.fn()}
      onDelete={vi.fn()}
      onSubmit={vi.fn()}
    />
  )
}

test("ADD Form (variant) structure is as expected.  Do not confuse with EDIT form variant.", () => {
  render(AddProductForm())
  // screen.debug()
  expect(screen.getAllByRole("textbox").length, "Expect 3 text inputs").toBe(3)
  expect(
    screen.queryByRole("heading", { name: /add.*new product/i })
  ).toBeInTheDocument()
  expect(
    screen.queryByRole("textbox", { name: /product name/i })
  ).toBeInTheDocument()
  expect(screen.queryByRole("textbox", { name: /price/i })).toBeInTheDocument()
  expect(
    screen.queryByRole("textbox", { name: /quantity/i })
  ).toBeInTheDocument()

  // Add form should not have ID input box
  expect(screen.queryByRole("textbox", { name: /id/i })).not.toBeInTheDocument()
})

test("Add form is editable", async () => {
  render(AddProductForm())
  const user = userEvent.setup()

  for (let name of [/product name/i, /price/i, /quantity/i]) {
    const input = screen.getByRole("textbox", { name })
    await user.type(input, "Lorem ipsum")
    expect(input).toHaveValue("Lorem ipsum")
  }
})
// each of the fields is editable

test("Edit Form (variant) structure is as expected.", () => {
  render(EditProductForm())
  // screen.debug()
  expect(screen.getAllByRole("textbox").length, "Expect 4 text inputs").toBe(4)
  expect(
    screen.getByRole("heading", { name: /edit product/i })
  ).toBeInTheDocument()
  expect(
    screen.queryByRole("textbox", { name: /product name/i })
  ).toBeInTheDocument()
  expect(screen.queryByRole("textbox", { name: /price/i })).toBeInTheDocument()
  expect(
    screen.queryByRole("textbox", { name: /quantity/i })
  ).toBeInTheDocument()

  expect(screen.queryByRole("textbox", { name: /id/i })).toBeInTheDocument()
})

test("Edit form is pre-loaded with current values", async () => {
  render(EditProductForm())
  expect(screen.getByRole("textbox", { name: /id/i })).toHaveValue(
    MOCK_PRODUCT._id
  )
  expect(screen.getByRole("textbox", { name: /product name/i })).toHaveValue(
    MOCK_PRODUCT.title
  )
  expect(screen.getByRole("textbox", { name: /price/i })).toHaveValue(
    String(MOCK_PRODUCT.price)
  )
  expect(screen.getByRole("textbox", { name: /quantity/i })).toHaveValue(
    String(MOCK_PRODUCT.quantity)
  )
})

test("Edit form - pre-loaded values can be replaced with new value", async () => {
  render(EditProductForm())
  const user = userEvent.setup()

  for (let name of [/product name/i, /price/i, /quantity/i]) {
    const input = screen.getByRole("textbox", { name })
    await user.clear(input)
    await user.type(input, "Lorem ipsum")
    expect(input).toHaveValue("Lorem ipsum")
  }
})

test("Editform: id field is NOT editable", () => {
  render(EditProductForm())
  expect(screen.getByRole("textbox", { name: /id/i })).toHaveAttribute(
    "readonly"
  )
})
