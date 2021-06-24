export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const INCREMENT_BY_VALUE = 'INCREMENT_BY_VALUE'
export const SET_RESPONSE = 'SET_RESPONSE'

interface Increment {
  type: typeof INCREMENT
}
interface Decrement {
  type: typeof DECREMENT
}
interface IncrementByValue {
  type: typeof INCREMENT_BY_VALUE
  payload: number
}

interface SetResponse {
  type: typeof SET_RESPONSE
  payload: any
}

export type CounterActionTypes =
  | Increment
  | Decrement
  | IncrementByValue
  | SetResponse
