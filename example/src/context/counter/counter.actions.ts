import {
  INCREMENT,
  DECREMENT,
  CounterActionTypes,
  INCREMENT_BY_VALUE,
  SET_RESPONSE
} from './counter.actions.types'
import { CustomDispatch } from 'contux'
import { CounterStore } from './counter.reducer.types'

export const increment = (): CounterActionTypes => {
  return { type: INCREMENT }
}
export const decrement = (): CounterActionTypes => {
  return { type: DECREMENT }
}

export const incrementIfOdd = () => (
  dispatch: CustomDispatch<CounterActionTypes, CounterStore>,
  state: CounterStore
) => {
  const { counter } = state
  if (counter % 2 !== 0) {
    dispatch({ type: 'INCREMENT' })
  }
}
export const incrementAsync = () => async (
  dispatch: CustomDispatch<CounterActionTypes, CounterStore>
) => {
  dispatch(increment())
  await setTimeout(() => {
    dispatch(increment())
  }, 2000)

  const result = await asyncRequest()
  dispatch({ type: SET_RESPONSE, payload: JSON.stringify(result) })

  console.log(result)
}

export const incrementByValue = (
  amountToIncrement: number
): CounterActionTypes => {
  return { type: INCREMENT_BY_VALUE, payload: amountToIncrement }
}

const asyncRequest = async () => {
  const result = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await result.json()
  return data
}
