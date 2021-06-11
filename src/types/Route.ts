import React from 'react';

export interface IRoute {
    [key: string]: any

    path: string
    component?: React.ElementType
    redirect?: string
    exact?: boolean
    isPublicRoute?: boolean
    layout?: React.ElementType
    children?: Array<IRoute>
    helmet?: {
        title: string | Function
    }
}