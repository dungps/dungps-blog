export interface Post {
    title: string
    slug: string
    category: string
    tags: Array<string>
    feature_image: string
    content?: string
    link: string
}

export interface Pagination {
    page: number
    limit: number
    total_items: number
    total_page: number
}

export interface PostQuery {
    slug?: string
    category?: string
    tag?: string
    limit?: number
    page?: number
    s?: string
}