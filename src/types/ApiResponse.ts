import { Pagination } from 'models/Post';

export interface ApiResponse<R> {
    success: boolean
    data: R
    pagination?: Pagination
}