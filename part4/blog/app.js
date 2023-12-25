const config = require('./utils/config')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery',false)
mongoose.connect(config.MONGODB_URI).then(result => {
    console.log('connected to MongoDB')
})
    .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
})

app.use(express.json())
app.use(cors())
app.use(Middleware.requestLogger)
app.use(Middleware.tokenExtractor)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(Middleware.errorLogger)
  
module.exports = app