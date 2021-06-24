import React from 'react'
import styled from 'styled-components'
import { useCounter } from './context/counter/counter.context'

const BoxC = styled.div`
  width: 100%;
  height: 100%;
  background-color: lightpink;
`

export const ComponentC = () => {
  const { state } = useCounter()
  const counterString = `Clicked: ${state.counter} times`
  return (
    <BoxC>
      <div>C</div>
      <div>{counterString}</div>
      <div>Response:</div>
      {state.response}
    </BoxC>
  )
}
