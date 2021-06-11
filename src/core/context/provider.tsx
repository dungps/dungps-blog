import React, { PropsWithChildren, useEffect, useReducer } from 'react';
import reducers from './reducers';
import { AppContext, defaultContext } from './context';
import bootstrapRunner from 'modules/bootstrap/runner';
import localHttpClient from '../../utils/request/LocalHttpClient';

const Provider = ({ children }: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducer(reducers, defaultContext(), (state) => state)

    localHttpClient.setDispatch(dispatch)

    useEffect(() => {
        const runner = async () => {
            await bootstrapRunner(state, dispatch)
        }

        runner()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <AppContext.Provider value={{state, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}

export default Provider