import React from "react";

export interface IRoute {
    path: string
    component?: React.ElementType
    redirect?: string
    exact?: boolean
    isPublicRoute?: boolean
    layout?: React.ElementType
    children?: Array<IRoute>
}