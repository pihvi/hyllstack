import {gql} from 'apollo-boost'

export const allBooks = gql`
{
  allBooks  {
    title
    author
    published
  }
}
`
export const allAuthors = gql`
{
  allAuthors  {
    name
    born
    bookCount
  }
}
`
export const addBook = gql`
  mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title, author: $author, published: $published, genres: $genres) {
      id
    }
  }
`
export const editAuthor = gql`
  mutation EditAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      id
    }
  }
`
