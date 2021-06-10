import localHttpClient from 'utils/request/LocalHttpClient';
import Bootstrap from 'models/Bootstrap';
import { ApiResponse } from 'types/ApiResponse';

export const getBootstrap = async (): Promise<Bootstrap> => {
    const response = await localHttpClient.get<ApiResponse<Bootstrap>>("/api/bootstrap")
    return response.data.data
}