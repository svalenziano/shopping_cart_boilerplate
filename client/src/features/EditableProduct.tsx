import { Button } from "@/components/ui/button"
import type { ProductHandler, Product, APIProduct } from "@/types/index"
import type React from "react"
import { useState, type MouseEventHandler, type SubmitEventHandler } from "react"
import { AddProductForm } from "./AddProductForm"

interface ProductProps {
  product: APIProduct;
  addToCartButton: React.MouseEventHandler;
  onSubmit: SubmitEventHandler;
}

function EditableProduct({
  product,
  onSubmit,
  addToCartButton,
}: ProductProps) {
  const [editing, setEditing] = useState(false)

  const onSubmitWrapper: SubmitEventHandler = (ev) => {
    ev.preventDefault()
    onSubmit(ev)
    setEditing(false)
  }

  return (
    <div className="m-4 rounded-md border-2 p-2">
      <h3>{product.title}</h3>
      <p>${`${product.price}`}</p>
      <p>{`${product.quantity} left in stock`}</p>
      <Button onClick={addToCartButton}>Add to Cart</Button>
      <Button onClick={() => setEditing(true)} variant="secondary">
        Edit
      </Button>
      {editing ? (
        <AddProductForm
          product={product}
          onSubmit={onSubmit}
          cancelButton={() => setEditing(false)}
        />
      ) : null}
    </div>
  )
}

export default EditableProduct
