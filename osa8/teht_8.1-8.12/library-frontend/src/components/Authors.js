import React from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import * as gql from '../gql'

const Authors = (props) => {
  const {loading, error, data} = useQuery(gql.allAuthors)
  const [editAuthor] = useMutation(gql.editAuthor)

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
            <td>
              <input
                type="number"
                defaultValue={a.born}
                onChange={({target}) => {
                  editAuthor({variables: {name: a.name, setBornTo: Number(target.value)}})
                }}
              />
            </td>
            <td>{a.bookCount}</td>
          </tr>
        )}
        </tbody>
      </table>

    </div>
  )
}

export default Authors
