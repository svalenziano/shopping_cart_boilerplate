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

async function updateProduct(product: partialAPIProduct): Promise<APIProduct> {
  if (!("_id" in product)) throw new Error("product is missing _id")
  const response = await fetch(`/api/products/${product._id}`, {
    method: "PUT",
    body: JSON.stringify(product),
    headers: {
      "Content-Type": "application/json",
    }
  })
  checkResponse(response, "Failed to update product")
  return apiProductSchema.parse(await response.json())
}

async function deleteProduct(product: partialAPIProduct): Promise<boolean> {
  if (!("_id" in product)) throw new Error("product is missing _id")
  const response = await fetch(`/api/products/${product._id}`, {
    method: "DELETE",
  })
  checkResponse(response, "Failed to delete product")
  return true
}

async function getCart(): Promise<APIProduct[]> {
  const response = await fetch("/api/cart")
  checkResponse(response, "Failed to retrieve cart")
  return apiProductListSchema.parse(await response.json())
}

function checkResponse(response: Response, errorMessage: string) {
  if (!response.ok) {
    throw new Error("API Error: " + errorMessage)
  }
}

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getCart,
}
