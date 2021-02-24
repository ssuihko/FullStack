if(!process.env.MONGOPASS || !process.env.PORT) {
    require('dotenv').config() 
}

const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
// some commentary here: it is crucial to place app.use(express.json) before the router 
const app = express()
app.use(express.json())
const blogsRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

const dbUrl = `mongodb+srv://fullstack12345:${config.MONGOPASS}@cluster0.niagi.mongodb.net/test?retryWrites=true&w=majority`;

logger.info('connecting to', dbUrl)
app.use('/api/blogs', blogsRouter)

mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })


  app.use(cors())
  app.use(middleware.requestLogger)
  
  app.use(middleware.unknownEndpoint)
  app.use(middleware.errorHandler)
  
  module.exports = app