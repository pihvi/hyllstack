import React from 'react'
import {useQuery} from '@apollo/react-hooks'
import {allAuthors} from '../gql'

const Authors = (props) => {
  const {loading, error, data} = useQuery(allAuthors)

  if (!props.show) return null
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const authors = data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
        <tr>
          <th>name</th>
          <th>
            born
          </th>
          <th>
            books
          </th>
        </tr>
        {authors.map(a =>
          <tr key={a.name}>
            <td>{a.name}</td>
            <td>{a.born}</td>
            <td>{a.bookCount}</td>
          </tr>
        )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
