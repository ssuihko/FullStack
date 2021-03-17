import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState({message: null, success: false })
  const blogFormRef = useRef()
  //const [createBlogVisible, setCreateBlogVisible] = useState(false)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {   
     const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
         if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)    
            blogService.setToken(user.token)
          }  
    }, [])

  const addBlog = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    setMessage({message: `a new blog ${newBlog} by ${user.name}`, success: true})
    setTimeout(() => {setMessage({message: null, success: false})}, 5000)
    const blogObject = {
      title: newBlog,
      author: newAuthor,
      url: newUrl,
    }

    try {
      if (await blogService.create(blogObject)) {
        setBlogs(blogs.concat(blogObject))

      }
    } catch (e) {
      setMessage({message: 'something went wrong', success: false})
      console.log(e)
      setTimeout(() => {setMessage({message: null, success: false})}, 5000)
    }

  }

  const likeBlog = id => {
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {...blog, likes: blog.likes + 1}

    try {
        blogService.updateLikes(id, changedBlog)
        blogService.getAll().then(blogs =>
          setBlogs( blogs ))
        window.location.reload()
    } catch (e){
      setMessage({message: 'something went wrong', success: false})
      console.log(e)
      setTimeout(() => {setMessage({message: null, success: false})}, 5000)
    }
  }

  const deleteBlog = id => {
    const blog = blogs.find(n => n.id === id)
    try {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
          blogService.deleteBlog(id)
          blogService.getAll().then(blogs =>
            setBlogs( blogs ))
        }
        window.location.reload()
    } catch (e) {
      setMessage({message: 'something went wrong', success: false})
      console.log(e)
      setTimeout(() => {setMessage({message: null, success: false})}, 5000)
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user) 
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage( {message: 'wrong credentials', success:false} )
      setTimeout(() => {
        setMessage({message: null, success: false} )
      }, 5000)
    }
  }

  function handleLogout() {
    window.localStorage.removeItem('loggedBlogappUser')
    window.location.reload()
  }

  if (window.localStorage.getItem('loggedBlogappUser') === null || user === null) {
    return (
      <div>
        <Notification message={message.message} success={message.success} />
      <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>   
      </div>
     
    )
  }

  return (
    <div>
      <h2>Blogs</h2>

      <Notification message={message.message} success={message.success}/>

        <p>{user.name} logged in</p>

        <button type="submit" onClick={() => handleLogout()}>logout</button>

      <h2>Create new Blog</h2>

      <div>
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm
        title={newBlog}
        author={newAuthor}
        url={newUrl}
        handleTitleChange={({ target }) => setNewBlog(target.value)}
        handleAuthorChange={({ target }) => setNewAuthor(target.value)}
        handleUrlChange={({ target }) => setNewUrl(target.value)}
        handleSubmit={addBlog}
      />
    </Togglable>
    </div>
      <div>

      <h4>Blog list</h4>
      
      {blogs.sort((a,b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} currentUser={user.name} blog={blog} likeBlog={() => likeBlog(blog.id)} deleteBlog={() => deleteBlog(blog.id)}/>
      )}
      </div>
    </div>
  )
}

export default App