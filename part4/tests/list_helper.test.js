const listHelper = require('../utils/list_helper')
const blogs =
[ { _id: '5a422a851b54a676234d17f7', title: 'React patterns', author: 'Michael Chan', url: 'https://reactpatterns.com/', likes: 7, __v: 0 }, 
    { _id: '5a422aa71b54a676234d17f8', title: 'Go To Statement Considered Harmful', author: 'Edsger W. Dijkstra', url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html', likes: 5, __v: 0 },
    { _id: '5a422b3a1b54a676234d17f9', title: 'Canonical string reduction', author: 'Edsger W. Dijkstra', url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html', likes: 12, __v: 0 },
    { _id: '5a422b891b54a676234d17fa', title: 'First class tests', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll', likes: 10, __v: 0 },
    { _id: '5a422ba71b54a676234d17fb', title: 'TDD harms architecture', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html', likes: 0, __v: 0 },
    { _id: '5a422bc61b54a676234d17fc', title: 'Type wars', author: 'Robert C. Martin', url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', likes: 2, __v: 0 }
]
const listWithOneBlog = [
    {
        id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    }
]

// 4.3
test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

// 4.4
describe('likes of one blog', () => {

    test('when list has only one blog equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
    })
})

describe('total likes', () => {

    test('when list has many blogs the total likes are the sum of all likes', () => {
        const result = listHelper.totalLikes(blogs)
        expect(result).toBe(36)
    })
})

// 4.5
describe('most likes', () => {

    test('the most likes a blog has received' , () => {
        const result = listHelper.favoriteBlog(blogs)
        expect(result).toBe(12)
    })
})

// 4.6
describe('writer with most blogs', () => {

    test('the writer who has most blogs', () => {
        const result = listHelper.mostBlogs(blogs)
        expect(result).toEqual({ author: 'Robert C. Martin', blogs: 3 })
    })
})

// 4.7
describe('writer with most likes', () => {

    test('the writer who has most likes on their blogs', () => {
        const result = listHelper.mostLikes(blogs)
        expect(result).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 })
    })
})