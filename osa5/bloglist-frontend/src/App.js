import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    console.log('boom')
  })

  const username = React.createRef()
  const password = React.createRef()
  const submit = () => {
    console.log('login', {variables: {username: username.current.value, password: password.current.value}})
    password.current.value = ''
    setUser('test')
  }
  if (user === null) {
    return (
      <div>
        <h2>login</h2>
        username: <input ref={username} type="text"/>
        <br/>
        password: <input ref={password} type="password"/>
        <input type="submit" value="login" onClick={submit}/>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App
