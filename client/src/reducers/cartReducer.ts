import type { APIProduct } from "@/types";

type Add = {
  type: 'add';
  payload: APIProduct;
}

type Set = {
  type: 'set';
  payload: APIProduct[]
}

type Update = {
  type: 'update';
  payload: APIProduct;
}

type Delete = {
  type: 'delete';
}

type Action = 
  | Add
  | Set
  | Update
  | Delete

export function cartReducer(currentState: APIProduct[], action: Action) {
  switch (action.type) {
    case 'add':
      return [
        ...currentState,
        action.payload
      ]
    case 'set':
      return action.payload
    case 'update':
      return currentState.map((oldProduct) => 
        oldProduct._id === action.payload._id ? action.payload : oldProduct
      )
    case 'delete':
      return []
    default:
      throw new Error(`Unexpected cartReducer action type.`)
  }
}