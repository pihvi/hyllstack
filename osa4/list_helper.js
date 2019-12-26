const _ = require('lodash')

const dummy = x => 1

const totalLikes = blogs => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const favoriteBlog = blogs => blogs.sort((a, b) => b.likes - a.likes).find(x => x)

const mostBlogs = blogs => _(blogs)
  .groupBy('author')
  .map((xs, key) => ({author: key, blogs: xs.length}))
  .orderBy('blogs', 'desc')
  .first()

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}
