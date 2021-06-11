import { AppContextState, DispatchAction } from 'core/context/types';
import { Actions } from './types';
import { getBootstrap } from './api';

async function bootstrapRunner(state: AppContextState, dispatch: DispatchAction<Actions>) {
    if (state.bootstrap.loading) {
        const response = await getBootstrap()
        dispatch({ type: Actions.LOAD_BOOTSTRAP, payload: response })
        dispatch({ type: Actions.LOADING_DONE })
    }
}

export default bootstrapRunner