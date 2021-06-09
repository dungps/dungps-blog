import { ActionData } from 'core/context/types';
import { Actions, BootstrapState } from './types';

export const bootstrapDefaultState: BootstrapState = {
    loading: true,
};

export const bootstrapReducer = (state: BootstrapState = bootstrapDefaultState, action: ActionData<Actions>): BootstrapState => {
    switch (action.type) {
        case Actions.LOADING_DONE:
            state.loading = false;
            break;
    }

    return state;
};