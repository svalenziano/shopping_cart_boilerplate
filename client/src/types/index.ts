import { z } from "zod"

export const productSchema = z.object({
  _id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
})

export type Product = z.infer<typeof productSchema>

export type ProductHandler = (arg0: Product) => void

export const apiProductSchema = z.object({
  _id: z.coerce.string("_id must be string"),
  title: z.coerce.string(),
  price: z.coerce.number(),
  quantity: z.coerce.number(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})
export type APIProduct = z.infer<typeof apiProductSchema>
export const apiProductListSchema = z.array(apiProductSchema)

export const partialAPIProductSchema = apiProductSchema.partial({
  _id: true,
  createdAt: true,
  updatedAt: true,
})
export type partialAPIProduct = z.infer<typeof partialAPIProductSchema>
