import {gql} from 'apollo-boost'

export const allBooks = (gql`
{
  allBooks  {
    title
    author
    published
  }
}
`)
