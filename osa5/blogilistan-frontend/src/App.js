import React, { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import Blog from './components/Blog'
import Toggleable from './components/Toggleable'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)

  const blogFormRef = React.createRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogListUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = async (blogObject) => {
    try {
      let returnedBlog = await blogService.create(blogObject)
      blogFormRef.current.toggleVisibility()

      returnedBlog.user = {
        username: user.username,
        name: user.name,
        id: returnedBlog.user
      }

      setBlogs(blogs.concat(returnedBlog))
      setNotification({ message: `a new blog "${returnedBlog.title}" 
                        by ${returnedBlog.author} added`, color: 'green' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)

    } catch (exception) {

      setNotification({ message: 'adding a new blog failed', color: 'red' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const modifyBlog = async (blogId, blogObject) => {
    await blogService.put(blogId, blogObject)

    const updatedBlogs = [...blogs]
    const arrayId = updatedBlogs.findIndex((blog) => blog.id === blogId)
    updatedBlogs[arrayId] = blogObject

    setBlogs(updatedBlogs)
  }

  const removeBlog = async (blogId) => {
    await blogService.remove(blogId)

    const updatedBlogs = [...blogs].filter((blog) => blog.id !== blogId)
    setBlogs(updatedBlogs)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setPassword('')

    } catch (expection) {
      setNotification({ message: 'wrong username or password', color: 'red' })
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogListUser')
    setUser(null)
    setUsername('')
  }

  const blogForm = () => (
    <Toggleable buttonLabel='add new blog' ref={blogFormRef}>
      <BlogForm addBlog={addBlog} />
    </Toggleable>
  )

  return (
    <div>
      <Notification notification={notification}/>
      {user === null ? <LoginForm
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        handleLogin={handleLogin}
      /> : <div>

        <h2>blogs</h2>

        <p>
          {`${user.name} logged in `}

          <button onClick={handleLogout}>
            logout
          </button>
        </p>

        <h2>create new</h2>
        {blogForm()}

        <div id='blogs'>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog
              key={blog.id}
              user={user}
              blog={blog}
              modifyBlog={modifyBlog}
              removeBlog={removeBlog}
            />
          )}
        </div>

      </div>
      }
    </div>
  )
}

export default App