import { ElementType } from "react"

interface IRoute {
    path: string
    component: ElementType
    exact?: boolean
    redirect?: string
    layout?: ElementType
}

export default IRoute