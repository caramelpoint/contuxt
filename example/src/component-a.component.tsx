import React from 'react'
import styled from 'styled-components'
import { decrement, increment } from './context/counter/counter.actions'
import {
  useCounter,
  useCounterDispatch
} from './context/counter/counter.context'

const BoxA = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightblue;
`

export const ComponentA = () => {
  const dispatch = useCounterDispatch()
  const { state } = useCounter()
  const counterString = `Clicked: ${state.counter} times`
  return (
    <BoxA>
      <div>A</div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <div>{counterString}</div>
    </BoxA>
  )
}
