import React from 'react';

const BlogForm = ({

    handleSubmit,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
    title,
    author,
    url

}) => { return (
    <div>
        <h2>create blog</h2>

        <form onSubmit={handleSubmit}>
            <div>
                title
                <input
                type="title"
                value={title}
                onChange={handleTitleChange}
                />
            </div>
            <div>
                author
                <input
                type="author"
                value={author}
                onChange={handleAuthorChange}
                />
            </div>
            <div>
                url
                <input
                type="url"
                value={url}
                onChange={handleUrlChange}
                />
            </div>
            <button type="submit">create</button>
        </form>
    </div>
)}

export default BlogForm