import type { APIProduct } from "@/types"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { MouseEventHandler } from "react"

interface CartWithItemsProps {
  products: APIProduct[]
  onCheckout: MouseEventHandler
}

function Cart({ products, onCheckout }: CartWithItemsProps) {
  const productCount = products.reduce(
    (accum, product) => (accum += product.quantity),
    0
  )

  return (
    <div className="m-4 rounded-md border-2 p-2">
      <div className="flex justify-start">
        <ShoppingCart className="mr-2" />
        <h2>Your Cart</h2>
      </div>
      {productCount <= 0 ? (
        <EmptyCart />
      ) : (
        <CartWithItems products={products} onCheckout={onCheckout} />
      )}
      <div className="flex justify-end">
        <Button disabled={productCount <= 0} onClick={onCheckout}>
          Checkout
        </Button>
      </div>
    </div>
  )
}

function EmptyCart() {
  return (
    <div>
      <p>Your cart is empty :(</p>
    </div>
  )
}

function toCurrency(amount: number): string {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" })
}

function CartWithItems({ products, onCheckout }: CartWithItemsProps) {
  const totalPrice = products.reduce(
    (accum, product) => (accum += product.price + product.quantity),
    0
  )
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Item</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product._id}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell className="text-right">
              {toCurrency(product.price)}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{toCurrency(totalPrice)}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default Cart
