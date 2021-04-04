import anecdoteService from '../services/anecdote'

export const addAnecdote = (content) => {

  return async dispatch => {
    const newAnec = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnec,
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type: 'VOTE',
      id
    })
  }
}


export const initializeAnecdotes = () => {
    return async dispatch => {
      const anecdotes = await anecdoteService.getAll()
      dispatch({
        type: 'INIT_ANECDOTES',
        data: anecdotes,
      })
    }
}

const anecdoteReducer = (state = [], action) => {

  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'VOTE':  
      return state.map(a => a.id !== action.id ? a : { ...a, votes: a.votes +=1 } )
    case 'INIT_ANECDOTES':
      return action.data
    default:
      return state
  }
}

export default anecdoteReducer