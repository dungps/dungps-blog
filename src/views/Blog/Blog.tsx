import React, { Fragment, useContext, useEffect } from "react"
import { Spinner } from "../../components"
import { AppContext } from "../../context"

const Blog = () => {
    const context = useContext(AppContext)

    useEffect(() => {
        context.blog.init()
    })

    if (context.blog.isLoading) {
        return <Spinner />
    }

    return (
        <h1>Blog</h1>
    )
}

export default Blog