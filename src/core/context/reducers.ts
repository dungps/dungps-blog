import { ActionData, AppContextState, AppReducers } from './types';
import { bootstrapReducer } from 'modules/bootstrap/reducer';
import { defaultContext } from './context';

const combineReducer = (options: any): (state: AppContextState, action: ActionData<any>) => AppContextState => {
    return (state: AppContextState = defaultContext(), action: ActionData<any>): AppContextState => {
        const newState = Object.assign({}, state)
        for (const key of Object.keys(options)) {
            if (newState[key as AppReducers]) {
                newState[key as AppReducers] = options[key](newState[key as AppReducers], action)
            }
        }
        
        return newState
    }
}

const reducers = combineReducer({
    [AppReducers.BOOTSTRAP]: bootstrapReducer
})

export default reducers