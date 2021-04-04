import React from 'react'
import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const newAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      
      props.addAnecdote(content)
      props.setNotification({message: 'You created a new anecdote ' + content}, 10)
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

  const connectedAnecdoteForm = connect(null, {
    addAnecdote,
    setNotification
  })(AnecdoteForm)
  
  export default connectedAnecdoteForm