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
import {
  useId,
  useState,
  type ComponentProps,
  type MouseEventHandler,
} from "react"

export function ToggleableAddProductForm() {
  const [visible, setVisible] = useState(false)

  const toggleForm: MouseEventHandler = (ev) => {
    ev.preventDefault()
    console.log("toggling!")
    setVisible(!visible)
  }

  if (visible) {
    return <AddProductForm toggleForm={toggleForm} />
  }
  return <Button onClick={toggleForm}>Add A Product</Button>
}

type AddProductFormProps = {
  product_id?: Number
  toggleForm: MouseEventHandler
}

/**
  Srdjan: 
    it's best to keep keep button separate from this 
    component so that the form is more reusable
 */
export function AddProductForm({
  product_id,
  toggleForm,
}: AddProductFormProps) {
  return (
    <form>
      {product_id === undefined ? (
        <h3>Add a new product</h3>
      ) : (
        <h3>Edit product id {String(product_id)}</h3>
      )}
      <TextField label={"Product Name"} placeholder="New name" />
      <TextField label={"Price"} placeholder="42.99" />
      <TextField label={"Quantity"} placeholder="42" />

      <Button onClick={(ev) => toggleForm(ev)}>Add</Button>
      <Button variant="secondary" onClick={(ev) => toggleForm(ev)}>
        Cancel
      </Button>
    </form>
  )
}

type TextFieldProps = ComponentProps<typeof Input> & { label: string }

function TextField({ label, placeholder, defaultValue }: TextFieldProps) {
  const id = useId()
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue || ""}
      />
    </Field>
  )
}
