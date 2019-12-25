import React from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import * as gql from '../gql'

const Authors = (props) => {
  const {loading, error, data} = useQuery(gql.allAuthors)
  const [editAuthor] = useMutation(gql.editAuthor)
  const [login, loginResult] = useMutation(gql.login)

  if (!props.show) return null
  if (loading) return 'Loading...'
  if (error) return `Error! ${error.message}`

  const authors = data.allAuthors
  const user = React.createRef()
  const pass = React.createRef()
  const submit = () => {
    login({variables: {username: user.current.value, password: pass.current.value}})
    pass.current.value = ''
  }
  if (loginResult.data && loginResult.data.login) {
    localStorage.setItem('token', loginResult.data.login.value)
  }

  return (
    <div>
      <h2>login</h2>
      username: <input ref={user} type="text"/>
      <br/>
      password: <input ref={pass} type="password"/>
      <input type="submit" value="login" onClick={submit}/>
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
