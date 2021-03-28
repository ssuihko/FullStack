import React, {useState} from 'react'
import '../style.css'

const Blog = ({ currentUser, blog, likeBlog, deleteBlog }) => {

    const [infoVisible, setInfoVisible] = useState(false)
    const hideWhenVisible = {display : infoVisible ? 'none' : ''}
    const showWhenVisible = {display : infoVisible ? '' : 'none'}

    let currentUsersBlog = null

    if(blog.user !== null) {
        currentUsersBlog = blog.user.name === currentUser.name
    }

    return (
        <div className="blog">
            <div className="blogstyle" style={hideWhenVisible}>
                {blog.title} {blog.author}
                <button id="view-button" onClick={() => setInfoVisible(true)}>view</button>
            </div>
            <div data-testid='all' className="blogstyle" style={showWhenVisible}>
                <button id="hide-button" onClick={() => setInfoVisible(false)}>hide</button>
                <div>
                    <div>
                        <div>
                            {blog.title}
                        </div>
                        <div>
                            {blog.author} 
                        </div>
                        <div>
                            likes {blog.likes} 
                            <button id="like-button" onClick={likeBlog}>like</button>
                        </div>
                        <div>
                            {blog.user.name}
                        </div>
                    </div>
                </div>
                { currentUsersBlog ? 
                    <button id="delete-button" onClick={deleteBlog}>delete</button>
                    :
                    <div></div>
                }
            </div> 
        </div> 
    )}

export default Blog