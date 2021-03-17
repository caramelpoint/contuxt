import React from 'react'

type ThunkDispatch<ActionTypes, StoreType> = (
  dispatch: React.Dispatch<ActionTypes | ThunkDispatch<ActionTypes, StoreType>>,
  state: StoreType
) => void

export type CustomDispatch<ActionTypes, StoreType> = (
  action: ActionTypes | ThunkDispatch<ActionTypes, StoreType>
) => void

const thunkDispatch = <ActionTypes, StoreType>(
  dispatch: React.Dispatch<ActionTypes>,
  state: StoreType
) => {
  return (input: ThunkDispatch<ActionTypes, StoreType> | ActionTypes) => {
    input instanceof Function
      ? input(thunkDispatch(dispatch, state), state)
      : dispatch(input)
  }
}

const BaseContext = <ActionTypes, StoreType>({
  children,
  reducer,
  initialReducerStore,
  storeContext,
  dispatchContext
}: {
  children: React.ReactNode
  reducer: (state: StoreType, action: ActionTypes) => StoreType
  initialReducerStore: StoreType
  storeContext: React.Context<StoreType | undefined>
  dispatchContext: React.Context<
    CustomDispatch<ActionTypes, StoreType> | undefined
  >
}) => {
  const [state, dispatch] = React.useReducer<
    React.Reducer<StoreType, ActionTypes>
  >(reducer, initialReducerStore)
  return (
    <storeContext.Provider value={state}>
      <dispatchContext.Provider
        value={thunkDispatch<ActionTypes, StoreType>(dispatch, state)}
      >
        {children}
      </dispatchContext.Provider>
    </storeContext.Provider>
  )
}

function stateHook<StoreType>(
  storeContext: React.Context<StoreType | undefined>
) {
  const context = React.useContext<StoreType | undefined>(storeContext)
  if (context === undefined) {
    throw new Error(
      `Custom State hook must be used within the corresponding provider, ${storeContext.displayName}`
    )
  }
  return context
}

function dispatchHook<ActionTypes, StoreType>(
  dispatchContext: React.Context<
    CustomDispatch<ActionTypes, StoreType> | undefined
  >
) {
  const context = React.useContext<
    CustomDispatch<ActionTypes, StoreType> | undefined
  >(dispatchContext)
  if (context === undefined) {
    throw new Error(
      `Custom Dispatch hook must be used within the corresponding provider, ${dispatchContext.displayName}`
    )
  }
  return context
}

export { BaseContext, stateHook, dispatchHook }
