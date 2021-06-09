import { AppContextState, DispatchAction } from 'core/context/types';
import { Actions } from './types';

function bootstrapRunner(_state: AppContextState, dispatch: DispatchAction<any>) {
    setTimeout(() => {
        dispatch({ type: Actions.LOADING_DONE })
    }, 2000)
}

export default bootstrapRunner