import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteList = ( props ) => {

  const anecdotesList = () => {
      if(props.filter.filter === "") {
          return props.anecdotes;
      }

      return props.anecdotes.filter((anecdote) => 
        anecdote.content.toLowerCase().includes(props.filter.filter.toLowerCase())
      ) 
  }

  const vote = (id) => {
    props.voteAnecdote(id)
    const an = props.anecdotes.find((an) => an.id === id)
    props.setNotification({message: 'You voted ' + an.content }, 10)
  }

  return (
    <div>
      {anecdotesList().sort(function(a, b) {
          return b.votes - a.votes
        }
      ).map(a => (
        <div key={a.id}>
          <div>{a.content}</div>
          <div>
          has {a.votes}
        <button onClick={() => vote(a.id)}>
          vote
        </button>
      </div>
        </div>
      ))}
    </div>
  )
}

const mapStateToProps = ( props ) => {
  return {
    anecdotes: props.anecdotes,
    filter: props.filter
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps, {
    voteAnecdote,
    setNotification
}) (AnecdoteList)

export default ConnectedAnecdoteList;