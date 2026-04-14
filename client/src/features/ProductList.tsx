import { H2 } from "@/components/Typography"
import EditableProduct from "@/features/EditableProduct"
import type { APIProduct, Product } from "@/types"
import { ToggleableAddProductForm } from "./AddEditProductForm"
import {
  useState,
  type FormEventHandler,
  type MouseEventHandler,
  type SubmitEventHandler,
} from "react"

interface ProductListProps {
  products: APIProduct[]
  onSubmit: SubmitEventHandler
  onDelete: MouseEventHandler
  onAddToCart: Function
}

type SortField = keyof APIProduct
type SortDirection = 'ascending' | 'descending'
type SortSpec = {
  field: SortField;
  direction: SortDirection;
}

/**
 * Sorts the products in-place
 */
function sortProducts(products: APIProduct[], spec: SortSpec): void {
  products.sort((a, b) => {
    a = String(a[spec.field]).toLowerCase()
    b = String(b[spec.field]).toLowerCase()
    if (spec.direction === 'ascending') return a <= b ? -1 : 1
    else return a >= b ? -1 : 1
  })
}

function ProductList({
  products,
  onSubmit,
  onDelete,
  onAddToCart,
}: ProductListProps) {
  const [sort, setSort] = useState<SortSpec>({field: 'price', direction: 'ascending'})

  sortProducts(products, sort)
  const sortedProducts = products.map((prod) => {
          return (
            <EditableProduct
              key={prod._id}
              product={prod}
              onSubmit={onSubmit}
              onDelete={onDelete}
              onAddToCart={onAddToCart}
            />
          )
        })

  return (
    <div className="w-full max-w-3xl min-w-md">
      <H2>Products</H2>
      <ul className="grid w-full grid-flow-row grid-cols-2 gap-0">
        {sortedProducts}
      </ul>
      <ToggleableAddProductForm onSubmit={onSubmit} onDelete={onDelete} />
    </div>
  )
}

export default ProductList
