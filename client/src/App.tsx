import { Flower } from "lucide-react"
import Cart from "./features/Cart"
import ProductList from "./features/ProductList"
import {
  useEffect,
  useState,
  type MouseEventHandler,
  type SubmitEventHandler,
} from "react"
import services from "./services"
import {
  apiProductSchema,
  partialAPIProductSchema,
  type APIProduct,
} from "./types"
import z from "zod"
import { toast } from "sonner"

function Logo() {
  return (
    <div className="flex h-60 justify-start p-10">
      <Flower className="h-full w-full" />
      <h1 className="text-4xl">flower shop</h1>
    </div>
  )
}

export function App() {
  const [products, setProducts] = useState<APIProduct[]>([])
  const [cart, setCart] = useState<APIProduct[]>([])

  useEffect(() => {
    async function getCart() {
      setCart(await services.getCart())
    }
    getCart()
  }, [])

  useEffect(() => {
    async function getProducts() {
      setProducts(await services.getProducts())
    }
    getProducts()
  }, [])

  const handleAddEditProduct: SubmitEventHandler = async (ev) => {
    const form = ev.target
    const formdata = Object.fromEntries(new FormData(form))
    const product = z.parse(partialAPIProductSchema, formdata)

    if ("_id" in product) {
      const updatedProduct = await services.updateProduct(product)
      setProducts(
        products.map((oldProduct) => {
          if (oldProduct._id === updatedProduct._id) return updatedProduct
          else return oldProduct
        })
      )
      toast.info(`"${updatedProduct.title}" was edited`)
    } else {
      const newProduct = await services.createProduct(product)
      setProducts([...products, newProduct])
      toast.info(`"${newProduct.title}" was added`)
    }
  }

  const handleDelete: MouseEventHandler = async (ev) => {
    ev.preventDefault()
    const form = (ev.target as HTMLElement).closest("form")!
    const formdata = Object.fromEntries(new FormData(form))
    const productToDelete = z.parse(partialAPIProductSchema, formdata)

    try {
      services.deleteProduct(productToDelete)
      setProducts(
        products.filter((exstProduct) => {
          return !(exstProduct._id === productToDelete._id)
        })
      )
      toast.info(`"${productToDelete.title}" was deleted`)
    } catch (e) {
      console.error(e)
    }
  }

  const handleAddToCart = async (product: APIProduct) => {
    try {
      const results = await services.addToCart(product._id)

      setProducts(products.map((oldProduct) => {
        if (oldProduct._id === product._id) return results.product
        else return oldProduct
      }))

      const existsInCart = !!cart.find((product) => product._id === results.item._id)
      if (existsInCart) {
        setCart(cart.map((oldCartItem) => {
          if (oldCartItem._id === results.item._id) return results.item
          else return oldCartItem
        }))
      } else {
        setCart([...cart, results.item])
      }
      toast.info(`${results.item.title} added to cart.`)

    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-3xl min-w-sm flex-col gap-4 text-sm leading-loose">
        <Logo />
        <Cart products={cart} />
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
