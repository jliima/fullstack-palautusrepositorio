const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('correct amount blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body.length).toBe(helper.initialBlogs.length)

})

test('blogs are identified with \'id\'', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blogs can be added with HTTP POST -method', async () => {
  await api
    .post('/api/blogs')
    .send(helper.postExample)
    .expect(201)
    .expect('Content-Type', /application\/json/)
  
  const blogsAtEnd = await helper.blogsInDataBase()
  const expectedPost = blogsAtEnd[blogsAtEnd.length-1]

  delete expectedPost.id

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
  expect(expectedPost).toEqual(helper.postExample)

})

test('if new blog does not have defined likes, likes will be set to 0', async () => {
  const postWithoutLikes = helper.postExample
  delete postWithoutLikes.likes

  const response = await api
    .post('/api/blogs')
    .send(postWithoutLikes)
  
  expect(response.body.likes).toBe(0)
})

test('if new blog does not have tittle or url, response is 400 \'Bad request\'', async () => {
  const postWoURL = helper.postExample
  delete postWoURL.url

  const postWoTitle = helper.postExample
  delete postWoTitle.title

  await api
    .post('/api/blogs')
    .send(postWoURL)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(postWoTitle)
    .expect(400)

})

afterAll(() => {
  mongoose.connection.close()
})