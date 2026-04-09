import { Button } from "@/components/ui/button"
import type { APIProduct } from "@/types/index"
import type React from "react"
import {
  useState,
  type MouseEventHandler,
  type SubmitEventHandler,
} from "react"
import { AddEditProductForm } from "./AddProductForm"

interface ProductProps {
  product: APIProduct
  onSubmit: SubmitEventHandler
  onDelete: MouseEventHandler
  onAddToCart: Function
}

function EditableProduct({
  product,
  onSubmit,
  onDelete,
  onAddToCart,
}: ProductProps) {
  const [editing, setEditing] = useState(false)

  const onSubmitWrapper: SubmitEventHandler = (ev) => {
    ev.preventDefault()
    onSubmit(ev)
    setEditing(false)
  }

  const handleAddToCart: MouseEventHandler = (ev) => {
    ev.preventDefault()
    onAddToCart(product)
  }

  return (
    <div className="m-4 rounded-md border-2 p-2">
      <h3>{product.title}</h3>
      <p>${`${product.price}`}</p>
      <p>{`${product.quantity} left in stock`}</p>
      <Button onClick={handleAddToCart}>Add to Cart</Button>
      <Button onClick={() => setEditing(true)} variant="secondary">
        Edit
      </Button>
      {editing ? (
        <AddEditProductForm
          product={product}
          onSubmit={onSubmitWrapper}
          cancelButton={() => setEditing(false)}
          onDelete={onDelete}
        />
      ) : null}
    </div>
  )
}

export default EditableProduct
