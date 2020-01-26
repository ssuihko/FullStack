import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])
  const copy = [ ...votes]

  const setToValue = (newValue) => {
      setSelected(newValue)
  }

const handleVote = (newValue) => {
    copy[newValue] += 1
    setVotes(copy)
}

console.log(votes)
var max = Math.max(...votes)
var index = votes.indexOf(max)
console.log(index)
  return (
    <div>
        <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}

      <p>has {votes[selected]} votes</p>
      <p><button onClick={() => setToValue(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>
      <button onClick= {() => handleVote(selected)}>vote</button></p>
      <h1>Anecdote with the most votes</h1>
      <p>{props.anecdotes[index]}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
