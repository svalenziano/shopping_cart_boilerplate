import { Flower } from "lucide-react";
import Cart from "./features/Cart";
import ProductList from "./features/ProductList";

const MOCK_PRODUCTS = [
  {
    id: 1,
    title: "Organic Compost Mix (40 lb Bag)",
    quantity: 20,
    price: 14.99,
  },
  {
    id: 2,
    title: "Heirloom Tomato Seed Variety Pack",
    quantity: 35,
    price: 8.49,
  },
  {
    id: 3,
    title: "Copper Garden Trowel",
    quantity: 12,
    price: 22.95,
  },
  {
    id: 4,
    title: "Organic Neem Oil Spray (32 oz)",
    quantity: 18,
    price: 16.75,
  },
  {
    id: 5,
    title: "Raised Garden Bed Kit (4x8 ft)",
    quantity: 6,
    price: 89.99,
  },
  {
    id: 6,
    title: "Worm Castings Fertilizer (15 lb Bag)",
    quantity: 14,
    price: 27.50,
  },
  {
    id: 7,
    title: "Biodegradable Seedling Pots (50-Pack)",
    quantity: 40,
    price: 11.25,
  },
  {
    id: 8,
    title: "Organic Herb Garden Starter Kit",
    quantity: 9,
    price: 34.99,
  },
  {
    id: 9,
    title: "Heavy-Duty Drip Irrigation Set",
    quantity: 7,
    price: 47.95,
  },
];

function Logo() {
  return (
    <div className="flex justify-start h-60 p-10">
      <Flower className="w-full h-full"/>
      <h1 className="text-4xl">flower shop</h1>
    </div>
  )
}

export function App() {
  return (
    <div className="flex min-h-svh p-6">
      
      <div className="flex max-w-3xl min-w-sm flex-col gap-4 text-sm leading-loose">
        <Logo />
        <Cart products={MOCK_PRODUCTS.slice(2,5)} />
        <ProductList products={MOCK_PRODUCTS} />
      </div>
    </div>
  )
}

export default App
