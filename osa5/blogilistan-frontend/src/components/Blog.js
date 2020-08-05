import React, { useState } from 'react'

const Blog = ({ user, blog, modifyBlog, removeBlog }) => {
  const [viewBlog, toggleviewBlog] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const visibility = { display: viewBlog ? '' : 'none' }

  const viewButton = () => {
    const buttonText = viewBlog
      ? 'hide'
      : 'view'
    return (
      <button onClick={() => toggleviewBlog(!viewBlog)}>{buttonText}</button>
    )
  }

  const removeButton = () => {
    if(user.username === blog.user.username) {
      return <div><button onClick={handleRemoveButtonClicked}>remove</button></div>
    } else {
      return null
    }
  }

  const handleLikeButtonClicked = () => {
    const modifiedBlog = { ...blog, likes: blog.likes + 1 }
    modifyBlog(blog.id, modifiedBlog)
  }

  const handleRemoveButtonClicked = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author} ?`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author} {viewButton()}
      </div>

      <div style={visibility}>
        <div>{blog.url}</div>
        <div>likes {blog.likes} <button onClick={handleLikeButtonClicked}>like</button></div>
        <div>{blog.user.name}</div>

        {removeButton()}

      </div>
    </div>
  )
}

export default Blog
