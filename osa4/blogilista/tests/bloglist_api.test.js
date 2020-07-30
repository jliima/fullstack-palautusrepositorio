const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

describe('when there is initially some blogs saved', () => {
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
  
  

  describe('when there is initially one user at database', () => {
    beforeEach(async () => {
      await User.deleteMany({})
      await api
        .post('/api/users')
        .send({ username: 'root', name: 'Jere Liimatainen', password: '1234' })
      
    })
    
    test('creation succeeds with a new username', async () => {
      const usersAtStart = await helper.usersInDataBase()

      const newUser = {
        username: 'hieroja',
        name: 'Jere Liimatainen',
        password: 'salis123',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDataBase()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('user creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDataBase()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('`username` to be unique')

      const usersAtEnd = await helper.usersInDataBase()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user creation fails with proper statuscode and message if username is too short', async () => {
      const usersAtStart = await helper.usersInDataBase()

      const newUser = {
        username: 'a1',
        name: 'Donald Trump',
        password: 'scretstuff'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain(`\`username\` (\`${newUser.username}\`) is shorter than the minimum`)

      const usersAtEnd = await helper.usersInDataBase()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('user creation fails with proper statuscode and message if password is too short', async () => {
      const usersAtStart = await helper.usersInDataBase()

      const newUser = {
        username: 'newUser123',
        name: 'Jhonny Depp',
        password: 'b2'
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('password is too short, minimum length is 3')

      const usersAtEnd = await helper.usersInDataBase()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
    })

    test('logging in with correct credentials works', async () => {

      const response = await api
        .post('/api/login')
        .send({ username: 'root', password: '1234' })
        .expect(200)
        .expect('Content-Type', /application\/json/)

      expect(response.body.token).toBeDefined()

    })
  
    test('trying to login with falsly details results in proper statuscode and message', async () => {
      await api
        .post('/api/login')
        .send({ username: 'Nonexisting', password: 'nothing' })
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    describe('when logging in has been succesfull', () => {

      test('blogs can be added with HTTP POST -method', async () => {

        const response = await api
          .post('/api/login')
          .send({ username: 'root', password: '1234' })
        const token = response.body.token

        await api
          .post('/api/blogs')
          .set('Authorization', 'bearer ' + token)
          .send(helper.postExample)
          .expect(201)
          .expect('Content-Type', /application\/json/)
        
        
        const blogsAtEnd = await helper.blogsInDataBase()

        const expectedPost = blogsAtEnd[blogsAtEnd.length-1]

        delete expectedPost.id
        delete expectedPost.user

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)
        expect(expectedPost).toEqual(helper.postExample)
      
      })

      test('if new blog does not have token, status code 401 is recived', async () => {
        await api
          .post('/api/blogs')
          .send(helper.postExample)
          .expect(401)
          .expect('Content-Type', /application\/json/)
      })
      
      test('if new blog does not have defined likes, likes will be set to 0', async () => {
        const response1 = await api
          .post('/api/login')
          .send({ username: 'root', password: '1234' })
        const token = response1.body.token
        
        const postWithoutLikes = helper.postExample
        delete postWithoutLikes.likes
      
        const response2 = await api
          .post('/api/blogs')
          .set('Authorization', 'bearer ' + token)
          .send(postWithoutLikes)
          .expect(201)
          .expect('Content-Type', /application\/json/)

        expect(response2.body.likes).toBe(0)
      })
      
      test('if new blog does not have tittle or url, response is 400 \'Bad request\'', async () => {
        const response = await api
          .post('/api/login')
          .send({ username: 'root', password: '1234' })
        const token = response.body.token
        
        const postWoURL = helper.postExample
        delete postWoURL.url
      
        const postWoTitle = helper.postExample
        delete postWoTitle.title
      
        await api
          .post('/api/blogs')
          .set('Authorization', 'bearer ' + token)
          .send(postWoURL)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
        await api
          .post('/api/blogs')
          .set('Authorization', 'bearer ' + token)
          .send(postWoTitle)
          .expect(400)
          .expect('Content-Type', /application\/json/)
      
      })

    })
    
  })
})


afterAll(() => {
  mongoose.connection.close()
})