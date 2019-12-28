import React, {useState, useEffect} from 'react'
import Blog from './components/Blog'
import bs from './services/blogs'
import axios from "axios";

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')))
  const [blogs, setBlogs] = useState([])
  const [notifikat, setNotsku] = useState('')

  useEffect(() => {
    bs.getAll().then(xs => setBlogs(xs))
  }, [])

  const username = React.createRef()
  const password = React.createRef()
  const title = React.createRef()
  const author = React.createRef()
  const url = React.createRef()
  const notsku = msg => {
    setNotsku(msg)
    setTimeout(() => {
      setNotsku('')
    }, 3000)
  }
  const submit = () => {
    const payload = {username: username.current.value, password: password.current.value}
    password.current.value = ''
    axios
      .post('/api/login', payload)
      .then(response => {
        setUser(response.data)
        localStorage.setItem('user', JSON.stringify(response.data))
      })
      .catch(() => {
        notsku('Login failed')
      })
  }
  const createClick = () => {
    const payload = {title: title.current.value, author: author.current.value, url: url.current.value}
    title.current.value = ''
    author.current.value = ''
    url.current.value = ''
    axios
      .post('/api/blogs', payload, {
        headers: {authorization: `bearer ${user.token}`}
      })
      .then(response => {
        setBlogs(blogs.concat([response.data]))
        notsku('Create successful: ' + response.data.title)
      })
      .catch(() => {
        alert('create failed')
      })
  }
  if (user === null) {
    return (
      <div>
        <h2>login</h2>
        <h3>{notifikat}</h3>
        username: <input key="uname" ref={username} type="text"/>
        <br/>
        password: <input key="pwd" ref={password} type="password"/>
        <input key="login" type="submit" value="login" onClick={submit}/>
      </div>
    )
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <h3>{notifikat}</h3>
        {user.name} logged in <input type="submit" value="logout" onClick={() => {
        setUser(null)
        localStorage.clear()
      }}/>
        <h3>create new</h3>
        title: <input key="title" ref={title} type="text"/>
        <br/>
        author: <input key="author" ref={author} type="text"/>
        <br/>
        url: <input key="url" ref={url} type="text"/>
        <br/>
        <input key="create" type="submit" value="create" onClick={createClick}/>
        <br/>
        <br/>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog}/>
        )}
      </div>
    )
  }
}

export default App
