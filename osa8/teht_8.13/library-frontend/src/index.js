import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from "@apollo/react-hooks"
import {SubscriptionClient} from 'subscriptions-transport-ws'

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

const ws = new SubscriptionClient('ws://localhost:4000/graphql')
ws.request(
  {
    query: `
        subscription bookAdded {
          bookAdded {
            title
          }
        }`,
    operationName: 'bookAdded',
  }).subscribe({
  next: (result) => {
    alert('Book added: ' + result.data.bookAdded.title)
    client.resetStore()
  },
})

ReactDOM.render(<ApolloProvider client={client}><App/></ApolloProvider>, document.getElementById('root'))
