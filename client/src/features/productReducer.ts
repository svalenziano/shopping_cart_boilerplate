import type { APIProduct } from "@/types"

export const initialState: APIProduct[] = []

type Replace = {
  type: "set"
  payload: APIProduct[]
}

type Update = {
  type: "update"
  payload: APIProduct
}

type Create = {
  type: "new"
  payload: APIProduct
}

type Delete = {
  type: "delete",
  payload: {id: string}
}

type Actions = Replace | Update | Create | Delete

export function productReducer(
  currentState: APIProduct[],
  action: Actions
): APIProduct[] {
  switch (action.type) {
    case "set":
      return action.payload
    case "update":
      return currentState.map((exstProd) => 
        exstProd._id === action.payload._id ? action.payload : exstProd
      )
    case "new":
      return [...currentState, action.payload]
    case "delete":
      return currentState.filter((exstProduct) => {
          return !(exstProduct._id === action.payload.id)
        })
    default:
      throw new Error("Invalid productReducer action")
  }
}

