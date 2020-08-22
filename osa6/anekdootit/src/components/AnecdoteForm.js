import React from 'react'
import { connect } from 'react-redux' 
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addNew = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    if(anecdote === '') {
      return
    }
    
    event.target.anecdote.value = ''
    props.createAnecdote(anecdote)
    props.setNotification(`new anecdote '${anecdote}'`, 5)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)