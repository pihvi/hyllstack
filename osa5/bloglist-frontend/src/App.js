import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import bs from './services/blogs'
import axios from "axios";

function App() {
  const [user, setUser] = useState(null)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    bs.getAll().then(xs => setBlogs(xs))
  }, [])

  const username = React.createRef()
  const password = React.createRef()
  const submit = () => {
    const payload = {username: username.current.value, password: password.current.value}
    password.current.value = ''
    axios
      .post('/api/login', payload)
      .then(response => setUser(response.data))
      .catch(() => {
        alert('Login failed')
      })
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
        {user.name} logged in <input type="submit" value="logout" onClick={() => setUser(null)}/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App
