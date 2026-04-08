import {z} from "zod"

export const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  quantity: z.number()
})

export type Product = z.infer<typeof productSchema>

export type ProductHandler = (arg0: Product) => void