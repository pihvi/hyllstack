import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommendations from "./components/Recommendations"
import {useApolloClient} from "@apollo/react-hooks"

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(localStorage.getItem('token'))
  const client = useApolloClient()

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('recommendations')}>recommendations</button>
        <button disabled={!token} onClick={() => setPage('add')}>add book</button>
        <button disabled={!token} onClick={() => {
          setToken(null)
          localStorage.clear()
          client.resetStore()
        }}>logout
        </button>
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
        setToken={setToken}
      />

      <Books
        show={page === 'books'}
      />

      <Recommendations
        show={page === 'recommendations'}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App
