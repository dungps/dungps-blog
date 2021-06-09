import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import reducers from './reducers';
import { AppContext, defaultContext } from './context';
import bootstrapRunner from 'modules/bootstrap/runner';

const Provider = ({ children }: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducer(reducers, defaultContext(), (state) => state)

    useEffect(() => {
        const runner = async () => {
            await bootstrapRunner(state, dispatch)
        }

        runner()
    }, [state])

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export default Provider