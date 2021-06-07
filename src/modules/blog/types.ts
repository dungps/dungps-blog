import { IPost } from "../../../models/Post"

interface BlogContextState {
    posts: Array<IPost>
    page: number
    canLoadMore: boolean
    isLoadMore: boolean
    isLoading: boolean
    loadMore: () => void
}

export default BlogContextState