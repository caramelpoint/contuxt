export const INCREMENT = 'INCREMENT'
export const DECREMENT = 'DECREMENT'
export const INCREMENT_BY_VALUE = 'INCREMENT_BY_VALUE'

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

export type CounterActionTypes = Increment | Decrement | IncrementByValue
