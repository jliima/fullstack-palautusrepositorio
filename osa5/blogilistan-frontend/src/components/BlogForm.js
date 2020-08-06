import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
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

  const handleCreatePressed = (event) => {
    event.preventDefault()
    addBlog(blogObject)
    setBlogObject({ title: '', author: '', url: '' })
  }

  return (
    <div>

      <form onSubmit={handleCreatePressed}>
        <div>
          title
          <input
            id='title'
            type='text'
            value={blogObject.title}
            onChange={({ target }) => handleTitleChange(target.value)}
          />
        </div>

        <div>
          author
          <input
            id='author'
            type='text'
            value={blogObject.author}
            onChange={({ target }) => handleAuthorChange(target.value)}
          />
        </div>

        <div>
          url
          <input
            id='url'
            type='text'
            value={blogObject.url}
            onChange={({ target }) => handleUrlChange(target.value)}
          />
        </div>

        <button type='submit'>
          create
        </button>

      </form>

    </div>
  )
}

export default BlogForm