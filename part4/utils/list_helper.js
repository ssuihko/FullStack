const { sortBy } = require('lodash')
var _ = require('lodash')

function like(item) {
    return item.likes
}

const favoriteBlog = (blogs) => {
    return Math.max(...blogs.map(o => o.likes), 0)
}

const totalLikes = (blogs) => {
    return blogs.map(like).reduce((a,b) => a + b)
}

const dummy = () => {
    return 1
}

// author with most blogs
const mostBlogs = (blogs) => {
    var res = _.last(_.map(_.countBy(blogs, 'author'),
        (val, key) =>  ({ author: key, blogs: val })))
    return res
}
// author with most likes
const mostLikes = (blogs) => {
    var res = _.last(_(blogs)
        .groupBy('author')
        .map((val, key) => ({
            'author': key,
            'likes': _.sumBy(val, 'likes') }))
        .sortBy('likes')
        .value())

    return res
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}