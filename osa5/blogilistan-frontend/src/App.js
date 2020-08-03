import React, { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])
  const[notification, setNotification] = useState(null)

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try { 
      const user = await loginService.login({username, password})

      window.localStorage.setItem(
        'loggedBlogListUser', JSON.stringify(user)
      )
      
      blogService.setToken(user.token)
      setUser(user)
      setPassword('')

    } catch (expection) {
        setNotification({message: 'wrong username or password', color: 'red'})
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
  
  return (
    <div>
      <Notification notification={notification} />
      {user === null 
        ? <LoginForm 
            username={username} 
            password={password} 
            setUsername={setUsername} 
            setPassword={setPassword}
            handleLogin={handleLogin}
            />
        
        : <Blogs
            blogs={blogs}
            user={user}
            handleLogout={handleLogout}
            setNotification={setNotification}
          />
      }

    </div>
  )
}

export default App