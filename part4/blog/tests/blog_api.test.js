const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const initialBlogs = require('./test_helpers.js')

const api = supertest(app)

let headers;

beforeAll(async () => {
    await User.deleteMany({})
    await Blog.deleteMany({})

    const blogObjects = initialBlogs.map(blog => new Blog(blog))
    blogObjects.forEach(async blog => {
       await blog.save()
    });

    const tempUser = {
        username: 'test123',
        name: 'test123',
        password: 'password',
      }
    await api
        .post('/api/users')
        .send(tempUser)

    const result = await api
        .post('/api/login')
        .send(tempUser)

    headers = {
    'Authorization': `Bearer ${result.body.token}`
    }
}, 10000)

test('Get total blogs', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body).toHaveLength(6)
}, 10000)

test('Check unique identifer "ID"', async () => {
    const result = await api.get('/api/blogs')

    expect(result.body[0].id).toBeDefined()
}, 10000)

test('Post request adds blog to mongodb', async () => {
    const newBlog = {
      title: "New test blog",
      author: "Test author",
      url: "test url"
    }

    await api.post('/api/blogs')
        .send(newBlog)
        .set(headers)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const result = await api.get('/api/blogs')

    expect(result.body.map(b => b.title)).toContain(newBlog.title)
}, 10000)

afterAll(async () => {
    await mongoose.connection.close()
})