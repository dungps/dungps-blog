import { ErrorActions, ErrorState } from './types';
import { ActionData } from '../../core/context/types';

export const errorDefaultState: ErrorState = {
    isError: false,
    message: "",
    raw: null
}

export const errorReducer = (state: ErrorState = errorDefaultState, action: ActionData<ErrorActions>) => {
    switch (action.type) {
        case ErrorActions.AXIOS_ERROR:
            return { ...state, isError: true, message: action.payload.message, raw: action.payload }
    }

    return { ...state }
}