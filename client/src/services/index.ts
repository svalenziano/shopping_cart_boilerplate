import { apiProductListSchema, type APIProduct } from "@/types"
import z from "zod"

async function getProducts(): Promise<APIProduct[]> {
  const response = await fetch("/api/products")
  const data = z.parse(apiProductListSchema, await response.json())
  return data
}

export default {
  getProducts,
}
