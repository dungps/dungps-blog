import { IPost } from "../../models/Post"

interface BlogContextState {
    posts: Array<IPost>
    canLoadMore: boolean
    isLoadMore: boolean
    isLoading: boolean
    nextCursor: string | null
    loadMore: () => void
    init: () => void
}

export default BlogContextState