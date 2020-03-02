import { composeWithDevTools } from 'redux-devtools-extension'
import { createStore, combineReducers } from 'redux'
import anecdoteReducer from './reducers/anecdoteReducer'

const reducer = combineReducers({
    anecdotes: anecdoteReducer
  })

const store = createStore(
    reducer,
    composeWithDevTools())


export default store