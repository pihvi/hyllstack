const blogs = require('../blogs.js')
const supertest = require('supertest')
let server, mongo, Blog, count, api

beforeAll(async () => {
  server = await blogs.server
  mongo = await blogs.mongo
  Blog = mongo.models.Blog
  count = await Blog.collection.countDocuments()
  api = supertest(blogs.app)
})

afterAll(async () => {
  await mongo.connection.close()
  await server.close()
})

describe('/api/blogs GET', () => {
  let result
  beforeAll(async () => {
    result = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })

  test('returns correct blog amount as JSON', async () => {
    expect(result.body.length).toBe(count)
    expect(typeof result.body[0]).toBe('object')
  })

  test('has "id" as identifier', async () => {
    result.body.forEach(blog => {
      expect(blog.id).toBeDefined()
    })
  })
})
