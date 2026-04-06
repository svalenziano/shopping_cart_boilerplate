import { Button } from "@/components/ui/button"
import type { ProductType } from "@/types/index"
import type React from "react"

interface ProductProps extends ProductType {
  addToCartButton: React.MouseEventHandler
  editButton: React.MouseEventHandler
}

function Product({
  name,
  price,
  inStock,
  addToCartButton,
  editButton,
}: ProductProps) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{`${price}`}</p>
      <p>{`${inStock} left in stock`}</p>
      <Button onClick={addToCartButton}>Add to Cart</Button>
      <Button onClick={editButton}>Edit</Button>
    </div>
  )
}

export default Product
