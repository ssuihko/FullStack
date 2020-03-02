import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    const dispatch = useDispatch()
  
    const newAnecdote = (event) => {
      event.preventDefault()
  
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(addAnecdote(content))
    }
  
    return (
      <div>
        <h2>Add new Anecdote</h2>
        <form onSubmit={newAnecdote}>
          <input name="anecdote" />
          <button type="submit">Add</button>
        </form>
      </div>
    )
  }
  
  export default AnecdoteForm