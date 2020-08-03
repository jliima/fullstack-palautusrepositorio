import React, { useState, useEffect } from 'react'
import Blog from './Blog'
import blogService from '../services/blogs'

const Blogs = ({blogs, user, handleLogout, setNotification}) => {
  const [blogObject, setBlogObject] = useState({
    title: '', author: '', url: ''
  })

  const handleTitleChange = (event) => {
    setBlogObject({
      title: event,
      author: blogObject.author,
      url: blogObject.url
    })
  }

  const handleAuthorChange = (event) => {
    setBlogObject({
      title: blogObject.title,
      author: event,
      url: blogObject.url
    })
  }

  const handleUrlChange = (event) => {
    setBlogObject({
      title: blogObject.title,
      author: blogObject.author,
      url: event
    })
  }

  const handleCreatePressed = async (event) => {
    event.preventDefault()

    try {
      const response = await blogService.create(blogObject)
      setNotification({message: `a new blog \"${response.data.title}\" by ${response.data.author} added`, color: 'green'})
      setTimeout(() => {
        setNotification(null)
      }, 3000)

    } catch (exception) {

      setNotification({message: 'adding a new blog failed', color: 'red'})
      setTimeout(() => {
        setNotification(null)
      }, 3000)
    }
    await setBlogObject({title: '', author: '', url: ''})
  }
  
  return (
    <div>
      <h2>blogs</h2>

      <p>
        {`${user.name} logged in `}

        <button onClick={handleLogout}>
          logout
        </button>
      </p>

      <form onSubmit={handleCreatePressed}>
        <h2>create new</h2>

        <div>
          title 
            <input
            type='text'
            value={blogObject.title}
            onChange={({target}) => handleTitleChange(target.value)}
            />
        </div>

        <div>
          author
            <input
            type='text'
            value={blogObject.author}
            onChange={({target}) => handleAuthorChange(target.value)}
            />
        </div>

        <div>
          url
            <input
            type='text'
            value={blogObject.url}
            onChange={({target}) => handleUrlChange(target.value)}
            />
        </div>

        <button type='submit'>
          create
        </button>

      </form>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}

    </div>
)}

export default Blogs