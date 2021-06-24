import {
  CounterActionTypes,
  DECREMENT,
  INCREMENT,
  INCREMENT_BY_VALUE,
  SET_RESPONSE
} from './counter.actions.types'
import { CounterStore } from './counter.reducer.types'

export const initialCounterStore: CounterStore = {
  counter: 0,
  response: ''
}

export const counterReducer = (
  state: CounterStore,
  action: CounterActionTypes
): CounterStore => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        counter: state.counter + 1
      }
    case DECREMENT:
      return {
        ...state,
        counter: state.counter - 1
      }
    case INCREMENT_BY_VALUE:
      return {
        ...state,
        counter: state.counter + action.payload
      }
    case SET_RESPONSE:
      return {
        ...state,
        response: action.payload
      }
    default: {
      throw new Error(`Unhandled action type: ${action}`)
    }
  }
}
