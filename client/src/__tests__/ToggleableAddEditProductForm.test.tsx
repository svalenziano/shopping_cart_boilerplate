import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { ToggleableAddProductForm } from "@/features/AddEditProductForm"

test("Form text boxes are hidden before button is pressed", () => {
  render(<ToggleableAddProductForm onSubmit={vi.fn()} onDelete={vi.fn()} />)
  expect(screen.queryAllByRole("textbox").length).toBe(0)
  expect(screen.queryAllByRole("button").length).toBe(1)
})

test("Form is shown when button is pressed", async () => {
  const user = userEvent.setup()
  render(<ToggleableAddProductForm onSubmit={vi.fn()} onDelete={vi.fn()} />)
  await user.click(screen.getByRole("button"))
  expect(screen.queryAllByRole("textbox").length).toBeGreaterThan(2)
})

test("Form is hidden after 'cancel' button is pressed", async () => {
  const user = userEvent.setup()
  render(<ToggleableAddProductForm onSubmit={vi.fn()} onDelete={vi.fn()} />)
  // show the form
  await user.click(screen.getByRole("button"))
  // re-hide the form
  await user.click(screen.getByRole("button", {name: /cancel/i}))
  expect(screen.queryAllByRole("textbox").length).toBe(0)
})