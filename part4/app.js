const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
// some commentary here: it is crucial to place app.use(express.json) before the router 
const app = express()
require('express-async-errors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const mongoose = require('mongoose')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connecting to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor) //4.20*
app.use(middleware.requestLogger)
//app.use(middleware.userExtractor) //4.22*

app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app