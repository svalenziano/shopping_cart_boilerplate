import { Flower } from "lucide-react"
import Cart from "./features/Cart"
import ProductList from "./features/ProductList"
import { useEffect, useState, type SubmitEventHandler } from "react"
import services from "./services"
import { apiProductSchema, partialAPIProductSchema, type APIProduct } from "./types"
import z from "zod"


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

  useEffect(() => {
    async function getProducts() {
      setProducts(await services.getProducts())
    }
    getProducts()
  }, [])

  const handleAddProduct: SubmitEventHandler = async (ev) => {
    const form = ev.target // TODO - REMOVE ASSERTION

    const formdata = Object.fromEntries(new FormData(form))
    const product = z.parse(partialAPIProductSchema, formdata)
    // console.log("NEW/EDITED PRODUCT!")
    // console.log(formdata)
    // console.log("Adding product to inventory:")
    // console.log(product)
    if ("_id" in product) {
      console.log(`Editing product:`)
      console.log(product)
    } else {
      console.log(`Adding product:`)
      console.log(product)
      const createdProduct = await services.createProduct(product)
      setProducts([...products, createdProduct])
    }

  }

  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-3xl min-w-sm flex-col gap-4 text-sm leading-loose">
        <Logo />
        <Cart products={products.slice(2, 5)} />
        <ProductList products={products} onSubmit={handleAddProduct} />
      </div>
    </div>
  )
}

export default App
