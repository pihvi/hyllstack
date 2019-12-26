const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => blogs.reduce((sum, blog) => {
  return sum + blog.likes
}, 0)

const favoriteBlog = (blogs) => blogs.sort((a, b) => b.likes - a.likes).find(x => x)

module.exports = {
  dummy, totalLikes, favoriteBlog
}
