import { Flower } from "lucide-react"
import Cart from "./features/Cart"
import ProductList from "./features/ProductList"
import {
  useEffect,
  useReducer,
  useState,
  type MouseEventHandler,
  type SubmitEventHandler,
} from "react"
import services from "./services"
import {
  partialAPIProductSchema,
  type APIProduct,
} from "./types"
import z from "zod"
import { toast } from "sonner"
import { productReducer } from "./reducers/productReducer"
import { cartReducer } from "./reducers/cartReducer"

function Logo() {
  return (
    <div className="flex h-60 justify-start p-10">
      <Flower className="h-full w-full" />
      <h1 className="text-4xl">flower shop</h1>
    </div>
  )
}

export function App() {
  const [products, dispatchProducts] = useReducer(productReducer, [])
  const [cart, dispatchCart] = useReducer(cartReducer, [])

  useEffect(() => {
    async function getCart() {
      dispatchCart({
        type: 'set',
        payload: await services.getCart()
      })
    }
    getCart()
  }, [])

  useEffect(() => {
    async function getProducts() {
      dispatchProducts({
        type: "set",
        payload: await services.getProducts(),
      })
    }
    getProducts()
  }, [])

  const handleAddEditProduct: SubmitEventHandler = async (ev) => {
    const form = ev.target
    const formdata = Object.fromEntries(new FormData(form))
    const product = z.parse(partialAPIProductSchema, formdata)

    if ("_id" in product) {
      const updatedProduct = await services.updateProduct(product)
      dispatchProducts({
        type: "update",
        payload: updatedProduct,
      })
      toast.info(`"${updatedProduct.title}" was edited`)
    } else {
      const newProduct = await services.createProduct(product)
      dispatchProducts({ type: "new", payload: newProduct })
      toast.info(`"${newProduct.title}" was added`)
    }
  }

  const handleDelete: MouseEventHandler = async (ev) => {
    ev.preventDefault()
    const form = (ev.target as HTMLElement).closest("form")!
    const formdata = Object.fromEntries(new FormData(form))
    const productToDelete = z.parse(partialAPIProductSchema, formdata)
    if (!productToDelete._id)
      throw new Error(
        `_id is required for deletion ${JSON.stringify(productToDelete)}`
      )

    try {
      services.deleteProduct(productToDelete)
      dispatchProducts({ type: "delete", payload: { id: productToDelete._id } })
      toast.info(`"${productToDelete.title}" was deleted`)
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddToCart = async (product: APIProduct) => {
    try {
      const results = await services.addToCart(product._id)

      dispatchProducts({type: "update", payload: results.product})

      const existsInCart = !!cart.find(
        (product) => product._id === results.item._id
      )
      if (existsInCart) {
        dispatchCart({type: 'update', payload: results.item})
      } else {
        dispatchCart({
          type: 'add',
          payload: results.item,
        })
      }
      toast.success(`${results.item.title} added to cart.`)
    } catch (e) {
      toast.error("Could not add to cart ☹️, please try again")
      console.error(e)
    }
  }

  const handleCheckout: MouseEventHandler = async (ev) => {
    ev.preventDefault()
    try {
      await services.checkout()
      dispatchCart({type: 'delete'})
      toast.success("Checkout success! 👍")
    } catch (e) {
      console.error(e)
      toast.error("Checkout failed ☹️")
    }
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-3xl min-w-md flex-col gap-4 text-sm leading-loose">
        <Logo />
        <Cart products={cart} onCheckout={handleCheckout} />
        <ProductList
          products={products}
          onSubmit={handleAddEditProduct}
          onDelete={handleDelete}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  )
}

export default App
