import React, { createContext } from 'react'
import { BaseContext, CustomDispatch, dispatchHook, stateHook } from 'contux'
import { CounterStore } from './counter.reducer.types'
import { CounterActionTypes } from './counter.actions.types'
import { counterReducer, initialCounterStore } from './counter.reducer'

const CounterStoreContext = createContext<CounterStore | undefined>(undefined)

const CounterDispatchContext = createContext<
  CustomDispatch<CounterActionTypes, CounterStore> | undefined
>(undefined)

const CounterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <BaseContext<CounterActionTypes, CounterStore>
      reducer={counterReducer}
      initialReducerStore={initialCounterStore}
      storeContext={CounterStoreContext}
      dispatchContext={CounterDispatchContext}
    >
      {children}
    </BaseContext>
  )
}

function useCounterState() {
  return stateHook<CounterStore>(CounterStoreContext)
}

function useCounterDispatch() {
  return dispatchHook<CounterActionTypes, CounterStore>(CounterDispatchContext)
}
function useCounter() {
  return { state: useCounterState(), dispatch: useCounterDispatch() }
}

export { CounterProvider, useCounter, useCounterState, useCounterDispatch }
