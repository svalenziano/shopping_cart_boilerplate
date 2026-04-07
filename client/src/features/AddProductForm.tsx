// import {
//   Field,
//   FieldContent,
//   FieldDescription,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldLegend,
//   FieldSeparator,
//   FieldSet,
//   FieldTitle,
// } from "@/components/ui/field"

// if active, return form
// otherwise, return button

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useId, useState, type MouseEventHandler } from "react"


export function AddProductForm() {
  const [active, setActive] = useState(false)
  const productId = useId()
  const priceId = useId()
  const qtyId = useId()

  const toggleForm: MouseEventHandler = (ev) => {
    ev.preventDefault()
    console.log('toggling!')
    setActive(!active)
  }

  if (active) {
    return (
      <form>
        <h3>Add a new product</h3>
        <Field>
          <FieldLabel htmlFor={productId}>Product Name</FieldLabel>
          <Input id={productId} type="text" placeholder="Beep Boop" />
        </Field>
        <Field>
          <FieldLabel htmlFor={priceId}>Price</FieldLabel>
          <Input id={priceId} type="text" placeholder="42.99" />
        </Field>
        <Field>
          <FieldLabel htmlFor={qtyId}>Quantity</FieldLabel>
          <Input id={qtyId} type="text" placeholder="3" />
        </Field>
        <Button onClick={(ev) => toggleForm(ev)}>Add</Button>
        <Button variant="secondary" onClick={(ev) => toggleForm(ev)}>
          Cancel
        </Button>
      </form>
    )
  }
  return <Button onClick={toggleForm}>Add A Product</Button>
}

