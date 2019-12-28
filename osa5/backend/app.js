const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const {tokenExtractor, errorHandler} = require('./utils/middleware')

const loginRouter = require('./controllers/login')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')

app.use(cors())
app.use(bodyParser.json())

const mongoUrl = 'mongodb+srv://fullstack:fullstack@cluster0-ostce.mongodb.net/pihvi5?retryWrites=true'
console.log('connecting to', mongoUrl)

mongoose.connect(mongoUrl, {useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

app.use(tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use(errorHandler)


module.exports = app
