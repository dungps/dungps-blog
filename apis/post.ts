import localRequest from '../utils/request/LocalRequest';
import { Response } from './types';
import { AxiosPromise } from 'axios';
import { Post } from '../types/Post';

export interface RequestParams {
    slug?: string
    category?: string
    tag?: string
    limit?: number | string
    page?: number | string
    s?: string
}

export const getPosts = (params: RequestParams): AxiosPromise<Response<Array<Post> | Post | string>> => {
    return localRequest.get<Response<Array<Post> | Post | string>>('/api/post', params);
};
