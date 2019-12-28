import React from 'react'
const Blog = ({blog, user}) => (
  <div>
    {blog.title} {blog.author} <input type="submit" value="delete" hidden={blog.user.username !== user.username}/>
  </div>
)

export default Blog
