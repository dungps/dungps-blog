import localRequest from '../utils/request/LocalRequest';
import { Response } from './types';
import { AxiosPromise } from 'axios';
import { Bootstrap } from '../types/Bootstrap';

export const getBootstrap = (): AxiosPromise<Response<Bootstrap>> => {
    return localRequest.get<Response<Bootstrap>>('/api/bootstrap');
};
