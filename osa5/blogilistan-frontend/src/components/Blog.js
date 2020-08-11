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

  const moreInfo = () => {
    if (viewBlog) {
      return (
        <div>
          <div>{blog.url}</div>

          <div>
            likes <span id='likes'>{blog.likes}</span> <button onClick={handleLikeButtonClicked}>like</button>
          </div>

          <div>{blog.user.name}</div>

          {removeButton()}

        </div>
      )
    } else return null
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
    <div id='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author} {viewButton()}
      </div>

      {moreInfo()}
    </div>
  )
}

export default Blog
