import React from 'react'

const BlogForm = ({

    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url

}) => { return (
    <div className="formDiv">
        <h2>create blog</h2>

        <form onSubmit={handleSubmit}>
            <div>
                title
                <input
                    id='title'
                    type="title"
                    value={title}
                    onChange={handleTitleChange}
                />
            </div>
            <div>
                author
                <input
                    id='author'
                    type="author"
                    value={author}
                    onChange={handleAuthorChange}
                />
            </div>
            <div>
                url
                <input
                    id='url'
                    type="url"
                    value={url}
                    onChange={handleUrlChange}
                />
            </div>
            <button id="button-create" type="submit">create</button>
        </form>
    </div>
)}

export default BlogForm