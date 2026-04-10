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
  onDelete: MouseEventHandler
}

/**
 * This wrapper is only for *ADDING* products and not for *EDITING*
 */
export function ToggleableAddProductForm({
  onSubmit,
  onDelete,
}: ToggleableAddProductFormProps) {
  const [visible, setVisible] = useState(false)

  const toggleForm: MouseEventHandler = (ev) => {
    ev.preventDefault()
    setVisible(!visible)
  }

  if (visible) {
    return (
      <AddEditProductForm
        cancelButton={toggleForm}
        onSubmit={onSubmit}
        onDelete={onDelete}
      />
    )
  }
  return <Button onClick={toggleForm}>Add A Product</Button>
}

type AddEditProductFormProps = {
  product?: APIProduct
  cancelButton: MouseEventHandler
  onSubmit: SubmitEventHandler
  onDelete: MouseEventHandler
}

/**
  Srdjan: 
    it's best to keep keep button separate from this 
    component so that the form is more reusable
 */
export function AddEditProductForm({
  product,
  cancelButton,
  onSubmit,
  onDelete,
}: AddEditProductFormProps) {
  const handleSubmit: SubmitEventHandler = (ev) => {
    ev.preventDefault()
    onSubmit(ev)
  }

  const deleteButton = (        
    <div>
      <Button variant="destructive" onClick={onDelete}>
        Delete
      </Button>
    </div>
  )

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
      <div className="flex justify-between">
        <div>
          <Button variant="confirm" type="submit">
            {product ? "Edit" : "Add"}
          </Button>
          <Button variant="secondary" onClick={cancelButton}>
            Cancel
          </Button>
        </div>
        {product && deleteButton}
      </div>
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
