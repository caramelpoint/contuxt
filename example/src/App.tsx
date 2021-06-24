import React from 'react'
import {
  decrement,
  increment,
  incrementAsync,
  incrementByValue,
  incrementIfOdd
} from './context/counter/counter.actions'
import {
  CounterProvider,
  useCounter,
  useCounterDispatch
} from './context/counter/counter.context'

const IncrementButton = () => {
  const dispatch = useCounterDispatch()
  return <button onClick={() => dispatch(increment())}>+</button>
}
const DecrementButton = () => {
  const dispatch = useCounterDispatch()
  return <button onClick={() => dispatch(decrement())}>-</button>
}
const IncrementIfOddButton = () => {
  const dispatch = useCounterDispatch()
  return <button onClick={() => dispatch(incrementIfOdd())}>+(ifOdd)</button>
}
const IncrementAsync = () => {
  const dispatch = useCounterDispatch()
  return (
    <button
      onClick={() => {
        debugger
        dispatch(incrementAsync())
      }}
    >
      +(Async)
    </button>
  )
}
const IncrementByTwo = () => {
  const dispatch = useCounterDispatch()
  return <button onClick={() => dispatch(incrementByValue(2))}>+2</button>
}

const CounterDisplay = () => {
  const { state } = useCounter()
  const counterString = `Clicked: ${state.counter} times`
  return <div>{counterString}</div>
}

const App = () => {
  return (
    <CounterProvider>
      <IncrementButton />
      <DecrementButton />
      <CounterDisplay />
      <IncrementIfOddButton />
      <IncrementAsync />
      <IncrementByTwo />
    </CounterProvider>
  )
}

export default App
