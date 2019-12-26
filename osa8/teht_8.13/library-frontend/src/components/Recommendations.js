import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {allBooks, me} from '../gql'

const Recommendations = (props) => {
  const meQuery = useQuery(me)
  const booksQuery = useQuery(allBooks)
  const books = booksQuery.data ? booksQuery.data.allBooks : []
  const genre = meQuery.data.me ? meQuery.data.me.favoriteGenre : 'no favorite genre'
  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: <b>{genre}</b></p>
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
          .filter(b => b.genres.includes(genre))
          .map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations
