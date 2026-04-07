import { Button } from "@/components/ui/button"
import type { ProductType } from "@/types/index"
import type React from "react"

interface ProductProps extends ProductType {
  addToCartButton: React.MouseEventHandler
  editButton: React.MouseEventHandler
}

function Product({
  title,
  price,
  quantity,
  addToCartButton,
  editButton,
}: ProductProps) {
  return (
    <div className="m-4 border-2 p-2 rounded-md">
      <h3>{title}</h3>
      <p>{`${price}`}</p>
      <p>{`${quantity} left in stock`}</p>
      <Button onClick={addToCartButton}>Add to Cart</Button>
      <Button onClick={editButton} variant="secondary">Edit</Button>
    </div>
  )
}

export default Product
