import EditableProduct from "@/features/EditableProduct"
import type { APIProduct, Product } from "@/types"
import { ToggleableAddEditProductForm } from "./AddEditProductForm"
import type {
  FormEventHandler,
  MouseEventHandler,
  SubmitEventHandler,
} from "react"

interface ProductListProps {
  products: APIProduct[]
  onSubmit: SubmitEventHandler
  onDelete: MouseEventHandler
  onAddToCart: Function
}

const placeholder: MouseEventHandler = (ev) => {
  ev.preventDefault()
  console.log("doing stuff!")
}

function ProductList({
  products,
  onSubmit,
  onDelete,
  onAddToCart,
}: ProductListProps) {
  return (
    <div className="w-full max-w-3xl min-w-md">
      <h2>Products</h2>
      <ul className="w-full">
        {products.map((prod) => {
          return (
            <EditableProduct
              key={prod._id}
              product={prod}
              onSubmit={onSubmit}
              onDelete={onDelete}
              onAddToCart={onAddToCart}
            />
          )
        })}
      </ul>
      <ToggleableAddEditProductForm onSubmit={onSubmit} onDelete={onDelete} />
    </div>
  )
}

export default ProductList
