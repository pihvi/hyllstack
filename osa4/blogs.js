const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    returnedObject.likes = returnedObject.likes ? returnedObject.likes : 0
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Blog = mongoose.model('Blog', blogSchema)

let mongoUrl = 'mongodb+srv://fullstack:fullstack@cluster0-ostce.mongodb.net/pihvi?retryWrites=true'
if (process.env.NODE_ENV === 'test' && process.env.TEST_MONGODB_URI) {
  mongoUrl = process.env.TEST_MONGODB_URI
}
module.exports.mongo = mongoose.connect(mongoUrl, {useNewUrlParser: true})
module.exports.app = app

app.use(cors())
app.use(bodyParser.json())

app.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

app.post('/api/blogs', async (request, response) => {
  const blog = new Blog(request.body)
  if (blog.title && blog.url) {
    const result = await blog.save()
    response.status(201).json(result)
  } else {
    response.status(400).end()
  }
})

app.del('/api/blogs', async (request, response) => {
  await Blog.deleteOne({_id: request.body.id})
  response.status(201).end()
})

const PORT = 3003
module.exports.server = app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  console.log('Fetching blog count..')
  console.log('Got', await Blog.collection.countDocuments(), 'blogs.')
})
