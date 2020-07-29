const dummy = () => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favouriteBlog = blogs => {
  const likesArray = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likesArray)
  return blogs.find(blog => blog.likes === maxLikes)

}

const mostBlogs = blogs => {
  const authors = blogs.map(blog => blog.author)
  let mostBlogs = 0

  const bloggers = authors.map(author => {

    const numberOfBlogs = blogs.reduce((sum, blog) => (
      blog.author === author ? sum + 1 : sum
    ), 0)
    
    numberOfBlogs > mostBlogs
      ? mostBlogs = numberOfBlogs
      : 1

    return {author: author, blogs: numberOfBlogs}

  })

  return bloggers.find(blogger => blogger.blogs === mostBlogs)

}

const mostLikes = blogs => {
  const authors = blogs.map(blog => blog.author)
  let mostLikes = 0

  const bloggers = authors.map(author => {

    const numberOfLikes = blogs.reduce((sum, blog) => (
      blog.author === author ? sum + blog.likes : sum
    ), 0)
    
    numberOfLikes > mostLikes
      ? mostLikes = numberOfLikes
      : 1

    return {author: author, likes: numberOfLikes}

  })

  return bloggers.find(blogger => blogger.likes === mostLikes)
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes
}