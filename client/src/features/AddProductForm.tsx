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

export function AddProductForm({}) {
  const [active, setActive] = useState(false)

  const hideForm: MouseEventHandler = (ev) => {
    ev.preventDefault()
    setActive(false)
  }

  if (active) {
    return <Form hideForm={hideForm} />
  }
  return <Button onClick={() => setActive(!active)}>Add A Product</Button>
}

export function InputDemo() {
  return (
    <Field>
      <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
      <FieldDescription>
        Your API key is encrypted and stored securely.
      </FieldDescription>
    </Field>
  )
}

interface FormProps {
  hideForm: MouseEventHandler;
}

function Form({ hideForm }: FormProps) {
  const productId = useId()
  const priceId = useId()
  const qtyId = useId()
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
      <Button onClick={(ev) => hideForm(ev)}>Add</Button>
      <Button variant="secondary" onClick={(ev) => hideForm(ev)}>
        Cancel
      </Button>
    </form>
  )
}
