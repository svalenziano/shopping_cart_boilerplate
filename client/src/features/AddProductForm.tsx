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
  type SubmitEvent,
  type SubmitEventHandler,
} from "react"
import type { Product } from "@/types"

type ToggleableAddProductFormProps = {
  onAddProduct: Function;
}

export function ToggleableAddProductForm({ onAddProduct }: ToggleableAddProductFormProps) {
  const [visible, setVisible] = useState(false)

  const toggleForm: MouseEventHandler = (ev) => {
    ev.preventDefault()
    console.log("toggling!")
    setVisible(!visible)
  }

  if (visible) {
    return (
      <AddProductForm
        editAddButton={() => {
          console.log("not implemented")
        }}
        cancelButton={toggleForm}
        onAddProduct={onAddProduct}
      />
    )
  }
  return <Button onClick={toggleForm}>Add A Product</Button>
}

type AddProductFormProps = {
  product?: Product;
  editAddButton: MouseEventHandler;
  cancelButton: MouseEventHandler;
  onAddProduct?: (arg0: Product) => void;
  onEditProduct?: (arg0: Product) => void;
}

/**
  Srdjan: 
    it's best to keep keep button separate from this 
    component so that the form is more reusable
 */
export function AddProductForm({
  product,
  editAddButton,
  cancelButton,
  onAddProduct,
  onEditProduct,
}: AddProductFormProps) {
  


  if (product && !onEditProduct) {
    throw Error("If passing a product you must provide an onEditProduct handler")
  }
  if (!product && !onAddProduct) {
    throw Error("If not passing a product, you must provide an onAddProduct handler")
  }

  function handleSubmit(ev): MouseEventHandler {
    ev.preventDefault()
    const form = ev.target.closest('form')
    console.log(ev.target)

    const handler = product ? onEditProduct : onAddProduct
    if (!handler) throw Error("A handler must be provided")
    const formdata = new FormData(form)
    const formObject = Object.fromEntries(formdata.entries())
    
    console.log("NEW/EDITED PRODUCT!")
    console.log(formObject)
    // handler({'placeholder': 'lorem'})
  }



  return (
    <form className="m-4 rounded-md border-2 p-2">
      {product === undefined ? (
        <h3>Add a new product</h3>
      ) : (
        <h3>Edit product</h3>
      )}
      {product ? (
        <TextField
          label={"ID"}
          defaultValue={product && product.id}
          disabled={true}
        />
      ) : null}
      <TextField
        label={"Product Name"}
        placeholder="New name"
        defaultValue={product && product.title}
      />
      <TextField
        label={"Price"}
        placeholder="42.99"
        defaultValue={product && product.price}
      />
      <TextField
        label={"Quantity"}
        placeholder="42"
        defaultValue={product && product.quantity}
      />

      <Button variant="confirm" onClick={handleSubmit}>
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
      />
    </Field>
  )
}
