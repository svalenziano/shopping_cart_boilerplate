import { Button } from "@/components/ui/button"
import type { ProductType } from "@/types/index"
import type React from "react"
import { useState, type MouseEventHandler } from "react"
import { AddProductForm } from "./AddProductForm"

interface ProductProps {
  product: ProductType;
  addToCartButton: React.MouseEventHandler;
  editButton: React.MouseEventHandler;
}

function EditableProduct({
  product,
  editButton,
  addToCartButton,
}: ProductProps) {
  const [editing, setEditing] = useState(false)

  const handleEditAdd: MouseEventHandler = (ev) => {
    ev.preventDefault()
    editButton(ev)
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
          editAddButton={handleEditAdd}
          cancelButton={() => setEditing(false)}
        />
      ) : null}
    </div>
  )
}

export default EditableProduct
