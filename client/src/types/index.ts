import {z} from "zod"

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number()
})

export type Product = z.infer<typeof productSchema>

export type ProductHandler = (arg0: Product) => void

export const apiProductSchema = z.object({
  _id: z.string(),
  title: z.string(),
  price: z.number(),
  quantity: z.number(),
  createdAt: z.iso.datetime(),
  updatedAt: z.iso.datetime(),
})

export type APIProduct = z.infer<typeof apiProductSchema>

export const apiProductListSchema = z.array(apiProductSchema)