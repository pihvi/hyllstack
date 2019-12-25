import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from "@apollo/react-hooks"

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  request: (operation) => {
    const token = localStorage.getItem('token')
    operation.setContext({
      headers: {
        authorization: token ? `bearer ${token}` : ''
      }
    })
  }
})

ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById('root'))
