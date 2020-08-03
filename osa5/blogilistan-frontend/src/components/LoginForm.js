import React from 'react'

const LoginForm = ({username, password, setUsername, setPassword, handleLogin}) => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>

      <div>
        username
          <input
          type='text'
          value={username}
          onChange={({target}) => setUsername(target.value)}
          />
      </div>

      <div>
        password
          <input
          type='text'
          value={password}
          onChange={({target}) => setPassword(target.value)}
          />
      </div>

      <div>
        <button type="submit">login</button>
      </div>

    </form>
  )

export default LoginForm