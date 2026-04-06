import { Button } from "@/components/ui/button"
// import Product from "./features/Product"
import ProductList from "./features/ProductList";
import { MockPropertyContext } from "node:test";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Amazon Kindle E-reader",
    quantity: 5,
    price: 79.99,
  },
  {
    id: 2,
    title: "Apple 10.5-Inch iPad Pro",
    quantity: 3,
    price: 649.99,
  },
  {
    id: 3,
    title: "Yamaha Portable Keyboard",
    quantity: 2,
    price: 155.99,
  },
  {
    id: 4,
    title: "Tinker, Tailor, Soldier, Spy - A John le Carre Novel",
    quantity: 12,
    price: 13.74,
  },
];

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      <div className="flex max-w-md min-w-0 flex-col gap-4 text-sm leading-loose">
        <ProductList products={MOCK_PRODUCTS} />
      </div>
    </div>
  )
}

export default App
