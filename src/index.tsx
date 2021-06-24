import React from 'react'

type ThunkDispatch<ActionTypes, StoreType> = (
  dispatch: React.Dispatch<ActionTypes | ThunkDispatch<ActionTypes, StoreType>>,
  state: StoreType
) => void

export type CustomDispatch<ActionTypes, StoreType> = (
  action: ActionTypes | ThunkDispatch<ActionTypes, StoreType>
) => void

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

  const enableLogger = !(
    process.env.development && process.env.development === 'true'
  )
  const preState = React.useRef<any>()

  const thunkDispatch = <ActionTypes, StoreType>(
    dispatch: React.Dispatch<ActionTypes>,
    state: StoreType | any
  ) => {
    return (input: ThunkDispatch<ActionTypes, StoreType> | ActionTypes) => {
      debugger
      if (input instanceof Function) {
        debugger
        state.at = Date.now()
        input(thunkDispatch(dispatch, state), state)
      } else {
        if (preState.current && preState.current.preState) {
          const possibleNewState = preState.current.preState
          if (possibleNewState.at > state.at) {
            preState.current = {
              action: input,
              preState: { ...possibleNewState }
            }
          } else {
            preState.current = {
              action: input,
              preState: { ...state, at: Date.now() }
            }
          }
        } else {
          preState.current = {
            action: input,
            preState: { ...state, at: Date.now() }
          }
        }

        dispatch(input)
      }
    }
  }

  React.useEffect(() => {
    if (!enableLogger || !preState.current) return

    console.groupCollapsed('Type')
    console.log(
      '%cPrevious State:',
      'color: #9E9E9E; font-weight: 700;',
      preState.current.preState
    )
    console.log(
      '%cAction:',
      'color: #00A7F7; font-weight: 700;',
      preState.current.action
    )
    console.log('%cNext State:', 'color: #47B04B; font-weight: 700;', state)
    console.groupEnd()
    preState.current.preState = { ...state, at: Date.now() }
  }, [state, enableLogger])

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
