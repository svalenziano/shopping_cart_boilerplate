import { Button } from "@/components/ui/button"
import type { ProductType } from "@/types/index"
import type React from "react"
import { useState } from "react"
import { AddProductForm } from "./AddProductForm"

interface ProductProps extends ProductType {
  addToCartButton: React.MouseEventHandler
  editButton: React.MouseEventHandler
}

function EditableProduct({
  title,
  price,
  quantity,
  addToCartButton,
}: ProductProps) {
  const [editing, setEditing] = useState(false)

  return (
    <div className="m-4 rounded-md border-2 p-2">
      <h3>{title}</h3>
      <p>{`${price}`}</p>
      <p>{`${quantity} left in stock`}</p>
      <Button onClick={addToCartButton}>Add to Cart</Button>
      <Button onClick={() => setEditing(true)} variant="secondary">
        Edit
      </Button>
      {editing ? (
        <AddProductForm
          product={{
            id: 42,
            title: title,
            price: price,
            quantity: quantity,
          }}
          editAddButton={() => {console.log("not implemented")}}
          cancelButton={() => setEditing(false)}
        />
      ) : null}
    </div>
  )
}

export default EditableProduct
