import { useState } from "react"
import { IPost } from "../../models/Post"
import { getPosts } from "./api"
import BlogContextState from "./types"

export const blog: BlogContextState = {
    posts: [],
    canLoadMore: false,
    isLoadMore: false,
    isLoading: true,
    nextCursor: null,
    loadMore: () => {},
    init: () => {}
}

export const SetupBlog = (): BlogContextState => {
    const [posts, setPosts] = useState<IPost[]>(blog.posts)
    const [canLoadMore, setCanLoadMore] = useState<boolean>(blog.canLoadMore)
    const [isLoadMore, setIsLoadMore] = useState<boolean>(blog.isLoadMore)
    const [isLoading, setIsLoading] = useState<boolean>(blog.isLoading)
    const [nextCursor, setNextCursor] = useState<string | null>(blog.nextCursor)

    const loadMore = async () => {
        if (canLoadMore) {
            setIsLoadMore(true)
            getPosts(nextCursor)
                .then((result) => {
                    if (typeof result !== "string" && Array.isArray(result.results)) {
                        setPosts([...posts, ...result.results])
                        setCanLoadMore(result.has_more)
                        setNextCursor(result.next_cursor)
                    } else {
                        setCanLoadMore(false)
                        setNextCursor(null)
                    }
                    setIsLoadMore(false)
                })
                .catch(err => {
                    console.error(err)
                    setIsLoadMore(false)
                })
        }
    }

    const init = async () => {
        if (isLoading) {
            getPosts()
                .then((result) => {
                    if (typeof result !== "string" && Array.isArray(result.results)) {
                        setPosts(result.results)
                        setCanLoadMore(result.has_more)
                        setNextCursor(result.next_cursor)
                    }
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.error(err)
                    setIsLoading(false)
                })
        }
    }

    return {
        posts,
        canLoadMore,
        isLoadMore,
        isLoading,
        nextCursor,
        loadMore,
        init
    }
}