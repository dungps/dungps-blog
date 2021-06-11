import { Post, PostQuery } from 'models/Post';
import localHttpClient from '../../utils/request/LocalHttpClient';
import { ApiResponse } from '../../types/ApiResponse';

export const getPosts = async (query: PostQuery = { page: 1, limit: 10 }): Promise<ApiResponse<Post | Array<Post>>> => {
    const response = await localHttpClient.get<ApiResponse<Post | Array<Post>>>("/api/post", query)
    return response.data
}