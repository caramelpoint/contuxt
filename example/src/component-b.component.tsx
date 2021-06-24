import React from 'react'
import styled from 'styled-components'
import {
  incrementAsync,
  incrementByValue,
  incrementIfOdd
} from './context/counter/counter.actions'
import { useCounterDispatch } from './context/counter/counter.context'

const BoxB = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightgreen;
`

export const ComponentB = () => {
  const dispatch = useCounterDispatch()
  return (
    <BoxB>
      <div>B</div>
      <button onClick={() => dispatch(incrementIfOdd())}>+(ifOdd)</button>
      <button onClick={() => dispatch(incrementAsync())}>+(Async)</button>
      <button onClick={() => dispatch(incrementByValue(2))}>+2</button>
    </BoxB>
  )
}
