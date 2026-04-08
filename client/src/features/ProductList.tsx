import EditableProduct from "@/features/EditableProduct"
import type { Product } from "@/types"
import { ToggleableAddProductForm } from "./AddProductForm"
import type { MouseEventHandler } from "react"

interface ProductListProps {
  products: Product[]
  onAddProduct: Function
}

const placeholder: MouseEventHandler = (ev) => {
  ev.preventDefault();
  console.log("doing stuff!")
}

function ProductList({ products, onAddProduct }: ProductListProps) {
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
      <ToggleableAddProductForm onAddProduct={onAddProduct} />
    </div>
  )
}

export default ProductList
