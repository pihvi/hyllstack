import React, {useState} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {allBooks} from '../gql'

const Books = (props) => {
  const [genre, setGenre] = useState('all genres')
  const booksQuery = useQuery(allBooks)
  const books = booksQuery.data ? booksQuery.data.allBooks : []
  if (!props.show) {
    return null
  }
  const genres = new Set(books.map(b => b.genres).flat())
  return (
    <div>
      <h2>books</h2>
      <p>in genre: <b>{genre}</b></p>
      <table>
        <tbody>
        <tr>
          <th>title</th>
          <th>
            author
          </th>
          <th>
            published
          </th>
        </tr>
        {books
          .filter(b => b.genres.includes(genre) || genre === 'all genres')
          .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {[...genres.values(), 'all genres']
        .map(g => <button disabled={genre === g} key={g} onClick={() => setGenre(g)}>{g}</button>)}
    </div>
  )
}

export default Books
