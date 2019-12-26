import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {allBooks} from '../gql'

const Books = (props) => {
  const booksQuery = useQuery(allBooks)
  const books = booksQuery.data ? booksQuery.data.allBooks : []
  if (!props.show) {
    return null
  }
  const genres = new Set(books.map(b => b.genres).flat())
  return (
    <div>
      <h2>books</h2>

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
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {[...genres.values()].map(g => <button key={g}>{g}</button>)}
    </div>
  )
}

export default Books
