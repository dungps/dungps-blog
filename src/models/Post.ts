export interface IPost {
    object: string
    id: string
    created_at: string
    last_edited_time: string
    archived: boolean,
    parent: {
        type: string,
        database_id: string
    },
    properties: NodeJS.Dict<IProperty>
}

interface IAnnotation {
    bold: boolean
    italic: boolean
    strikethrough: boolean
    underline: boolean
    code: boolean
    color: string
}

export interface IText {
    type: string,
    text: {
        content: string,
        link: string | null
    },
    annotations: IAnnotation
    plain_text: string | null
    href: string | null
}

export interface IProperty {
    id: string
    type: string
    select?: {
        name: string
        color: string
    }
    phone_number: string
    email?: string
    number?: number
    rich_text?: Array<IText> | string
    title?: Array<IText>
    multi_select?: Array<{
        name: string
        color: string
    }>
    created_time?: string
    url?: string
    files?: Array<{
        name: string
    }>
    last_edited_time?: string

}