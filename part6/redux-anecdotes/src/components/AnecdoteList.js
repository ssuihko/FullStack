import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch()

  return (
    <div>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => dispatch(voteAnecdote(anecdote.id))}>
          vote
        </button>
      </div>
    </div>
  )
}

const AnecdoteListing = () => {

  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <div>
      {anecdotes.map(a => (
        <Anecdote key={a.id} anecdote={a} 
        handleClick={() => 
        dispatch(voteAnecdote(a.id))}/>
      ))}
    </div>
  )
}

export default AnecdoteListing