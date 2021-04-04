import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import store from './store'
import anecdoteService from './services/anecdote'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  )

  anecdoteService.getAll().then(an => 
      store.dispatch( initializeAnecdotes(an) )
  )

