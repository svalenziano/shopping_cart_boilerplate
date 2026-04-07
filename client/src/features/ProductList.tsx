import Product from "@/features/EditableProduct"
import type { ProductType } from "@/types"
import { AddProductForm } from "./AddProductForm"
import type { MouseEventHandler } from "react"

interface ProductListProps {
  products: ProductType[]
}

const placeholder: MouseEventHandler = () => {}

function ProductList({ products }: ProductListProps) {
  return (
    <div className="w-full max-w-3xl min-w-md">
      <h2>Products</h2>
      <ul className="w-full">
        {products.map((prod) => {
          return (
            <Product
              id={prod.id}
              key={prod.id}
              title={prod.title}
              price={prod.price}
              quantity={prod.quantity}
              addToCartButton={placeholder}
              editButton={placeholder}
            />
          )
        })}
      </ul>
      <AddProductForm />
    </div>
  )
}

export default ProductList
