import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {

  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.data.sort((a, b) => b.votes - a.votes)

    case 'VOTE':
      const changedAnecdote = action.data.anecdote
      return state.map(a => 
        a.id !== changedAnecdote.id ? a : changedAnecdote
      ).sort((a, b) => b.votes - a.votes)
      
    case 'NEW_ANECDOTE':
      return state.concat(action.data)
      
    default:
      return state
  }
}

export const initializeAnecdotes = () => (
  async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }

)

export const createAnecdote = (anecdote) => (
  async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
)

export const voteAnecdote = (anecdote) => (

  async dispatch => {
    const editedAnecdote = await anecdoteService.editAnecdote({...anecdote, votes: anecdote.votes+1})
    dispatch({
      type: 'VOTE',
      data: { anecdote: editedAnecdote }
    })
  }
)

export default reducer