import React from 'react'
import styled from 'styled-components'
import { ComponentA } from './component-a.component'
import { ComponentB } from './component-b.component'
import { ComponentC } from './component-c.component'
// import {
//   decrement,
//   increment,
//   incrementAsync,
//   incrementByValue,
//   incrementIfOdd
// } from './context/counter/counter.actions'
import {
  CounterProvider
  // useCounterState
  // useCounter,
  // useCounterDispatch
} from './context/counter/counter.context'

// const IncrementButton = () => {
//   const dispatch = useCounterDispatch()
//   return <button onClick={() => dispatch(increment())}>+</button>
// }
// const DecrementButton = () => {
//   const dispatch = useCounterDispatch()
//   return <button onClick={() => dispatch(decrement())}>-</button>
// }
// const IncrementIfOddButton = () => {
//   const dispatch = useCounterDispatch()
//   return <button onClick={() => dispatch(incrementIfOdd())}>+(ifOdd)</button>
// }
// const IncrementAsync = () => {
//   const dispatch = useCounterDispatch()
//   return <button onClick={() => dispatch(incrementAsync())}>+(Async)</button>
// }
// const IncrementByTwo = () => {
//   const dispatch = useCounterDispatch()
//   return <button onClick={() => dispatch(incrementByValue(2))}>+2</button>
// }

// const CounterDisplay = () => {
//   const { state } = useCounter()
//   const counterString = `Clicked: ${state.counter} times`
//   return <div>{counterString}</div>
// }

const StylePage = styled.div`
  padding: 50px;
  background-color: orange;
  height: 100vh;
`

// const BoxA = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: lightblue;
// `

const Row = styled.div`
  padding: 10px;
  height: 100px;
  background-color: green;
  display: flex;
`
// const BoxB = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: lightgreen;
// `
// const BoxC = styled.div`
//   width: 100%;
//   height: 100%;
//   background-color: lightpink;
// `

const App = () => {
  return (
    <CounterProvider>
      <StylePage>
        PAGE
        <Row>
          <ComponentA />
          {/* <BoxA>
            A
            <IncrementButton />
            <DecrementButton />
            <CounterDisplay />
          </BoxA> */}
        </Row>
        <Row>
          <ComponentB />
          {/* <BoxB>
            B
            <IncrementIfOddButton />
            <IncrementAsync />
            <IncrementByTwo />
          </BoxB> */}
          <ComponentC />
          {/* <BoxC>
            C
            <CounterDisplay />
          </BoxC> */}
        </Row>
      </StylePage>
    </CounterProvider>
  )
}

export default App
