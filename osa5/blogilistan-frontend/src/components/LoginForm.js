import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin
}) => (
  <form onSubmit={handleLogin}>
    <h2>log in to application</h2>

    <div>
      username
      <input
        id='username'
        type='text'
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
    </div>

    <div>
      password
      <input
        id='password'
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    </div>

    <div>
      <button id='login-button' type="submit">login</button>
    </div>

  </form>
)

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
}

export default LoginForm