import EditableProduct from "@/features/EditableProduct"
import type { ProductType } from "@/types"
import { AddProductForm, ToggleableAddProductForm } from "./AddProductForm"
import type { MouseEventHandler } from "react"

interface ProductListProps {
  products: ProductType[]
}

const placeholder: MouseEventHandler = (ev) => {
  ev.preventDefault();
  console.log("doing stuff!")
}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="w-full max-w-3xl min-w-md">
      <h2>Products</h2>
      <ul className="w-full">
        {products.map((prod) => {
          return (
            <EditableProduct
              key={prod.id}
              product={prod}
              addToCartButton={placeholder}
              editButton={placeholder}
            />
          )
        })}
      </ul>
      <ToggleableAddProductForm />
    </div>
  )
}

export default ProductList
