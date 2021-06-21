import { Pagination } from '../types/Post';

export interface Response<T> {
    data: T
    success: boolean
    pagination?: Pagination
}
