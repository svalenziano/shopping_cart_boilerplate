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

import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  useId,
  useState,
  type ComponentProps,
  type MouseEventHandler,
  type SubmitEventHandler,
} from "react"
import { type APIProduct } from "@/types"

type ToggleableAddProductFormProps = {
  onSubmit: SubmitEventHandler
}

export function ToggleableAddProductForm({
  onSubmit,
}: ToggleableAddProductFormProps) {
  const [visible, setVisible] = useState(false)

  const toggleForm: MouseEventHandler = (ev) => {
    ev.preventDefault()
    setVisible(!visible)
  }

  if (visible) {
    return <AddProductForm cancelButton={toggleForm} onSubmit={onSubmit} />
  }
  return <Button onClick={toggleForm}>Add A Product</Button>
}

type AddProductFormProps = {
  product?: APIProduct
  cancelButton: MouseEventHandler
  onSubmit: SubmitEventHandler
}

/**
  Srdjan: 
    it's best to keep keep button separate from this 
    component so that the form is more reusable
 */
export function AddProductForm({
  product,
  cancelButton,
  onSubmit,
}: AddProductFormProps) {

  const handleSubmit: SubmitEventHandler = (ev) => {
    ev.preventDefault()
    onSubmit(ev) 
  }

  return (
    <form className="m-4 rounded-md border-2 p-2" onSubmit={handleSubmit}>
      {product === undefined ? (
        <h3>Add a new product</h3>
      ) : (
        <h3>Edit product</h3>
      )}
      {product ? (
        <TextField
          label={"ID"}
          name="_id"
          defaultValue={product && product._id}
          readOnly={true}
        />
      ) : null}
      <TextField
        label={"Product Name"}
        name="title"
        placeholder="New name"
        defaultValue={product && product.title}
      />
      <TextField
        label={"Price"}
        name="price"
        placeholder="42.99"
        defaultValue={product && product.price}
      />
      <TextField
        label={"Quantity"}
        name="quantity"
        placeholder="42"
        defaultValue={product && product.quantity}
      />

      <Button variant="confirm" type="submit">
        {product ? "Edit" : "Add"}
      </Button>
      <Button variant="secondary" onClick={cancelButton}>
        Cancel
      </Button>
    </form>
  )
}

type TextFieldProps = ComponentProps<typeof Input> & { label: string }

function TextField({
  label,
  placeholder,
  defaultValue,
  disabled,
  name,
  readOnly,
}: TextFieldProps) {
  const id = useId()
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        id={id}
        type="text"
        placeholder={placeholder}
        defaultValue={defaultValue || ""}
        disabled={disabled}
        name={name}
        readOnly={readOnly}
      />
    </Field>
  )
}
