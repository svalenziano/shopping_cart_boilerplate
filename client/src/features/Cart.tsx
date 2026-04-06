import type { ProductType } from "@/types"

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

interface CartWithItemsProps {
  products: ProductType[]
}

function Cart({ products }: CartWithItemsProps) {
  const productCount = products.reduce((accum, product) => accum += product.quantity, 0)

  return (
    <div className="m-4 border-2 p-2 rounded-md">
      <div className="flex justify-start">
        <ShoppingCart className="mr-2"/>
        <h2 >Your Cart</h2>
      </div>
      {productCount <= 0 ? <EmptyCart /> : <CartWithItems products={ products }/>}
      <div className="flex justify-end">
        <Button disabled={productCount <= 0}>Checkout</Button>
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

function CartWithItems({products}: CartWithItemsProps) {
  const totalPrice = products.reduce((accum, product) => accum += product.price, 0)
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
          <TableRow key={product.id}>
            <TableCell className="font-medium">{product.title}</TableCell>
            <TableCell>{product.quantity}</TableCell>
            <TableCell className="text-right">{product.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">{totalPrice}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}

export default Cart