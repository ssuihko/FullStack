import React, { useState } from 'react'
import  { useField } from './hooks'
import {
  BrowserRouter as Router,
  Switch, Route, Link, useParams, useHistory, 
} from "react-router-dom"


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
      <Link style={padding} to="/">anecdotes</Link>
    </div>
  )
}


const AnecdoteList = ({ anecdotes }) => (
  
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(a => 
      <li key={a.id}>
        <Link to={`/anecdotes/${a.id}`}>{a.content}</Link>
        </li>
        )}
    </ul>
  </div>
)

const Anecdote = ( {anecdotes} ) => {

  const id = useParams().id  
  const ane = anecdotes.find(a => a.id === id)
  var link = ane.info

  return (
  <div>
    <h2>{ane.content}</h2>
    <p>has {ane.votes} votes</p>
    <p>for more info see <a href={link}> here </a></p>
  </div>
  )
}

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
 // const [content, setContent] = useState('')
 // const [author, setAuthor] = useState('')
 // const [info, setInfo] = useState('')

  const anec = useField('text')

  var history = useHistory()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      ...anec,
      votes: 0
    })

    props.setNotification('a new anecdote ' + anec.content + ' created')
    setTimeout(() => props.setNotification(''), 10000)
    history.push('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={anec.content} onChange={anec.onChangeC} />
        </div>
        <div>
          author
          <input name='author' value={anec.author} onChange={anec.onChangeA} />
        </div>
        <div>
          url for more info
          <input name='info' value={anec.info} onChange={anec.onChangeI} />
        </div>
        <button type="submit" >create</button>
        <button type="reset" onClick={anec.reset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const Home = () => (
    <div>
      <AnecdoteList anecdotes={anecdotes} />
    </div>
  )

  return (
    <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        <br/>{notification}
     <Switch> 
 
      <Route path="/anecdotes/:id">  
        <Anecdote anecdotes={anecdotes} />    
      </Route>

      <Route path="/about">
      <About />
      </Route>

      <Route path="/create"> 
      <CreateNew addNew={addNew} setNotification={setNotification}/>
      </Route>

      <Route path="/">
      <Home />
      </Route>
    </Switch>

    <Footer />
    </Router>
  )
}

export default App;
