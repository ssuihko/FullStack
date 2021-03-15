const { before, result } = require('lodash')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async() => {
    await Blog.deleteMany({})
    for(let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

describe('fetching blogs from the database', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('there are initially two blogs in the database', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(2).expect
    })

    test('blogs are identified by id', async () => {
        const response = await api.get('/api/blogs')
        response.body.forEach((blog) => {
            expect(blog.id).toBeDefined()
        })
    })

    test('all blogs are returned', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initialBlogs.length)})

    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const contents = response.body.map(r => r.title)
        expect(contents).toContain(
            'Helloo'  )
    })
})

describe('addition of a new blog', () => {
    test('a valid blog can be added', async() => {
        const newBlog = {
            title: 'Hiiii',
            author: 'Hiiii',
            url: 'www.reddit.com',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type',  /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

        const title = blogsAtEnd.map(n => n.title)
        expect(title).toContain('Hiiii')

    })

    test('likes is set to zero if undefined', async() => {
        const newBlog = {
            title: 'Hiiii',
            author: 'Hiiii',
            url: 'www.reddit.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(200)
            .expect('Content-Type',  /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        const like = blogsAtEnd.map(n => n.likes)

        expect(like[helper.initialBlogs.length]).toBe(0)
    })

    test('code 400 if title or url is missing', async() => {
        const newBlog1 = {
            author: 'Hiiii',
            url: 'www.reddit.com',
        }

        await api
            .post('/api/blogs')
            .send(newBlog1)
            .expect(400)
            .expect('Content-Type',  /application\/json/)

        const newBlog2 = {
            title: 'Hello',
            author: 'Hiiii'
        }

        await api
            .post('/api/blogs')
            .send(newBlog2)
            .expect(400)
            .expect('Content-Type',  /application\/json/)

        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)

    })

})

describe('deleting blogs works', () => {
    test('delete blog', async() => {

        const blogsAtStart = await helper.blogsInDB()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDB()

        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1)
    })
})

describe('updating a blog works', () => {
    test('update blogs likes', async() => {

        const updateBlog = {
            title: 'Helloo',
            author: 'Helloo',
            url: 'www.google.fi',
            likes: 7
        }

        const blogsAtStart = await helper.blogsInDB()

        await api.put(`/api/blogs/${blogsAtStart[0].id}`)
            .send(updateBlog)
            .expect(200)
            .expect('Content-Type',  /application\/json/)


        const blogsAtEnd = await helper.blogsInDB()
        expect(blogsAtEnd.length).toBe(helper.initialBlogs.length)
        const like = blogsAtEnd.map(n => n.likes)
        expect(like[0]).toBe(updateBlog.likes)
    })

})

afterAll(() => {
    mongoose.connection.close()
})

