import React, { createContext, PropsWithChildren, useState, useEffect } from "react"
import { IPost } from "../../../models/Post"
import { getPosts } from "./api"
import BlogContextState from "./types"

const contextDefaultValues: BlogContextState = {
    posts: [],
    page: 1,
    canLoadMore: true,
    isLoadMore: false,
    isLoading: true,
    loadMore: () => {}
}

export const BlogContext = createContext<BlogContextState>(contextDefaultValues)

const BlogProvider = ({ children }: PropsWithChildren<any>) => {
    const [posts, setPosts] = useState<IPost[]>(contextDefaultValues.posts)
    const [page, setPage] = useState<number>(contextDefaultValues.page)
    const [canLoadMore, setCanLoadMore] = useState<boolean>(contextDefaultValues.canLoadMore)
    const [isLoading, setIsLoading] = useState<boolean>(contextDefaultValues.isLoading)
    const [isLoadMore, setIsLoadMore] = useState<boolean>(contextDefaultValues.isLoadMore)

    const loadMore = async () => {
        setIsLoadMore(true)
    }

    useEffect(() => {
        getPosts(null, (err, data: IPost[]) => {
            if (err) {
                console.error(err)
                return
            }
            console.log(data)
        })
    })

    return (
        <BlogContext.Provider
            value={{
                posts,
                page,
                canLoadMore,
                isLoading,
                isLoadMore,
                loadMore
            }}
        >
            {children}
        </BlogContext.Provider>
    )
}

export default BlogProvider