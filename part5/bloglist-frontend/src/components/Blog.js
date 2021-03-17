import React, {useState} from 'react'
import '../style.css'

const Blog = ({currentUser, blog, likeBlog, deleteBlog}) => {

  const [infoVisible, setInfoVisible] = useState(false)


  const hideWhenVisible = {display : infoVisible ? 'none' : ''}
  const showWhenVisible = {display : infoVisible ? '' : 'none'}
  
  return (
<div>
  <div className= 'blogstyle' style={hideWhenVisible}>
    {blog.title} {blog.author}
    <button onClick={() => setInfoVisible(true)}>view</button>
  </div>
  <div className='blogstyle' style={showWhenVisible}>
  <button onClick={() => setInfoVisible(false)}>hide</button>
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
      <button onClick={likeBlog}>like</button>
      </div>
      {blog.user == null ? 
      <div>
       { currentUser }
       </div>
       :
      <div>
      {blog.user.name}
      </div>
      }
      </div>
    </div>
    {blog.user != null && blog.user.name === currentUser ? 
    <button onClick={deleteBlog}>delete</button>
    :
    <div></div>
    }
  </div> 
  </div> 
)}

export default Blog