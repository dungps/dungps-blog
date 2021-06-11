export enum ErrorActions {
    AXIOS_ERROR = "@error/axios_error"
}

export interface ErrorState {
    isError: boolean
    message: string
    raw: any
}