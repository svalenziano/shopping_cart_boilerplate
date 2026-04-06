import Product from "@/features/Product"
import type { ProductType } from "@/types"

interface ProductListProps {
  products: ProductType[]
}

function ProductList({ products }: ProductListProps) {
  return (
    <ul>
      {products.map((prod) => {
        return (
          <Product
            id={prod.id}
            key={prod.id}
            name={prod.name}
            price={prod.price}
            inStock={prod.inStock}
            addToCartButton={}
            editButton={}
          />
        )
      })}
    </ul>
  )
}

export default ProductList
