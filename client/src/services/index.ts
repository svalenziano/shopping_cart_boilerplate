import { apiProductListSchema, apiProductSchema, type APIProduct, type partialAPIProduct } from "@/types"
import z from "zod"

async function getProducts(): Promise<APIProduct[]> {
  const response = await fetch("/api/products")
  checkResponse(response, "Failed to fetch products")
  const data = z.parse(apiProductListSchema, await response.json())
  return data
}

async function createProduct(product: partialAPIProduct): Promise<APIProduct> {
  const response = await fetch("/api/products", {
    method: "POST",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    }
  })
  checkResponse(response, "Failed to create product")
  return apiProductSchema.parse(await response.json())
}

function checkResponse(response: Response, errorMessage: string) {
  if (!response.ok) {
    throw new Error(errorMessage)
  }
}

export default {
  getProducts,
  createProduct,
}
