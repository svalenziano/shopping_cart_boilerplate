import { render, screen } from "@testing-library/react"
import App from "@/App"
import ProductService from "@/services"
import { userEvent } from "@testing-library/user-event"

const MOCK_PRODUCTS = [
  {
    _id: "69d6c252ac3984a29e4e2ab8",
    title: "Trowel",
    price: 9000.99,
    quantity: 660,
    createdAt: "2026-04-08T21:02:10.387Z",
    updatedAt: "2026-04-10T16:22:49.677Z",
    __v: 0,
  },
  {
    _id: "69d6c253ac3984a29e4e2ab9",
    title: "Watering Can",
    price: 19.99,
    quantity: 96,
    createdAt: "2026-04-08T21:02:11.029Z",
    updatedAt: "2026-04-10T15:13:20.739Z",
    __v: 0,
  },
  {
    _id: "69d6c253ac3984a29e4e2aba",
    title: "Pruning Shearz",
    price: 24.99,
    quantity: 15,
    createdAt: "2026-04-08T21:02:11.622Z",
    updatedAt: "2026-04-09T21:14:47.575Z",
    __v: 0,
  },
]

const MOCK_CART = MOCK_PRODUCTS.slice(0, 2)

vi.mock("@/services")
const mockService = vi.mocked(ProductService)

afterEach(() => {
  vi.resetAllMocks()
})

test("App renders with products and cart", async () => {
  mockService.getProducts.mockResolvedValue(MOCK_PRODUCTS)
  mockService.getCart.mockResolvedValue(MOCK_CART)
  render(<App />)
  expect(
    await screen.findAllByRole("button", { name: /add to cart/i })
  ).toHaveLength(3)
  expect(
    await screen.findAllByRole("button", { name: /checkout/i })
  ).toHaveLength(1)
  // there should be 2 for each - one in cart and one in the main page
  for (let product of MOCK_CART) {
    expect((await screen.findAllByText(product.title)).length).toBe(
      MOCK_CART.length
    )
  }
})

test("Empty shopping cart has placeholder text, button is disabled", async () => {
  mockService.getProducts.mockResolvedValue(MOCK_PRODUCTS)
  mockService.getCart.mockResolvedValue([])
  render(<App />)
  expect(await screen.findByText(/cart.+empty/i)).toBeInTheDocument()
  expect(
    await screen.findByRole("button", { name: /checkout/i })
  ).toBeDisabled()
})

test("Add product adds product to UI", async () => {
  const user = userEvent.setup()
  const productToAdd = {
    _id: "69d6c252ac3984a29e4e2ab8",
    title: "Trowel",
    price: 123,
    quantity: 42,
    createdAt: "2026-04-08T21:02:10.387Z",
    updatedAt: "2026-04-10T16:22:49.677Z",
    __v: 0,
  }

  mockService.getProducts.mockResolvedValue([])
  mockService.getCart.mockResolvedValue([])
  mockService.createProduct.mockResolvedValue(productToAdd)
  render(<App />)

  const addButton = screen.getByRole("button", { name: /add a product/i })
  await user.click(addButton)

  await user.type(
    await screen.findByRole("textbox", { name: /product name/i }),
    productToAdd.title
  )

  await user.type(
    await screen.findByRole("textbox", { name: /price/i }),
    String(123)
  )

  await user.type(
    await screen.findByRole("textbox", { name: /quantity/i }),
    String(productToAdd.quantity)
  )

  await user.click(screen.getByRole("button", { name: /add/i }))

  expect(await screen.findByText(productToAdd.title)).toBeInTheDocument()
  expect(await screen.findByText(/\$.*123.*/)).toBeInTheDocument()
})

test("Add Product Form disappears after product is added", () => {
  
})
