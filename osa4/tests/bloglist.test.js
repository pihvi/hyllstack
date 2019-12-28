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

describe('/api/blogs POST', () => {
  let result
  beforeAll(async () => {
    result = await api
      .post('/api/blogs')
      .send({title: 'test add'})
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
  afterAll(async () => {
    await Blog.deleteOne({title: 'test add'})
  })

  test('adds blog count by one', async () => {
    expect(await Blog.collection.countDocuments()).toBe(count + 1)
    expect(result.body.title).toBe('test add')
  })

  test('sets default likes to 0', async () => {
    expect(result.body.likes).toBe(0)
  })
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
