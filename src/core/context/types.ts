import { defaultContext } from './context';

export enum AppReducers {
    BOOTSTRAP = 'bootstrap',
    ERROR = 'error'
}

export type AppContextState = ReturnType<typeof defaultContext>

export interface ActionData<T> {
    type: T,
    payload?: any
}

export type DispatchAction<T> = (action: ActionData<T>) => void