const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Helloo',
        author: 'Helloo',
        url: 'www.google.fi',
        likes: 5
    },
    {
        title: 'Woorld',
        author: 'Wooorld',
        url: 'kalevauva.fi',
        likes: 7
    },
]

const nonExistingId = async () => {
    const blog = new Blog({title: 'poistettavissa'})
    await blog.save()
    await blog.remove()

    return blog._id.toString()
}

const blogsInDB = async () => {
    const blogs = await Blog.find({})
    return blogs.map(b => b.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDB, usersInDb
}