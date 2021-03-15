const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { usersInDb } = require('../tests/test_helper')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('', async (request, response, next) => {

    const body = request.body

    /*  const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id) */

    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id  })

    if(!body.title || !body.url) {
        response.status(400).json({
            error: 'Title is missing'
        })

    } else {

        if(!body.likes) {
            body.likes = 0
        }

        // const blog = new Blog(body)
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
        response.json(savedBlog.toJSON())

    }

})

blogsRouter.put('/:id', async (request, response, next) => {

    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updated => {
            response.json(updated.toJSON())
        })
})

blogsRouter.delete('/:id', async (request, response) => {
    const blog = await Blog.findById(request.params.id)

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }


    if(blog.user.toString() === decodedToken.id.toString()) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
    } else {
        response.status(401).json({ error: 'blog can only be deleted by its creator' })
    }
})

module.exports = blogsRouter