import { createContext } from "react"
import { bootstrapDefaultState } from "modules/bootstrap/reducer"
import { AppContextState, AppReducers, DispatchAction } from './types';

export const defaultContext = () => {
    return {
        [AppReducers.BOOTSTRAP]: bootstrapDefaultState
    }
}

export const AppContext = createContext<{state: AppContextState, dispatch: DispatchAction<any>}>({
    state: defaultContext(),
    dispatch: () => {}
})

export const AppConsumer = AppContext.Consumer