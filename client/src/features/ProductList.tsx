import EditableProduct from "@/features/EditableProduct"
import type { APIProduct, Product } from "@/types"
import { ToggleableAddEditProductForm } from "./AddProductForm"
import type {
  FormEventHandler,
  MouseEventHandler,
  SubmitEventHandler,
} from "react"

interface ProductListProps {
  products: APIProduct[]
  onSubmit: SubmitEventHandler
  onDelete: MouseEventHandler
}

const placeholder: MouseEventHandler = (ev) => {
  ev.preventDefault()
  console.log("doing stuff!")
}

function ProductList({ products, onSubmit, onDelete }: ProductListProps) {
  return (
    <div className="w-full max-w-3xl min-w-md">
      <h2>Products</h2>
      <ul className="w-full">
        {products.map((prod) => {
          return (
            <EditableProduct
              key={prod._id}
              product={prod}
              addToCartButton={placeholder}
              onSubmit={onSubmit}
              onDelete={onDelete}
            />
          )
        })}
      </ul>
      <ToggleableAddEditProductForm onSubmit={onSubmit} onDelete={onDelete} />
    </div>
  )
}

export default ProductList
