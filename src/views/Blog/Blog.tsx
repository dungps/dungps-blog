import React from "react"
import BlogProvider, { BlogContext } from "../../modules/blog"

const Blog = () => {
    return (
        <BlogProvider>
            <BlogContext.Consumer>
                {context => {
                    return <h1>Blog</h1>
                }}
            </BlogContext.Consumer>
        </BlogProvider>
    )
}

export default Blog