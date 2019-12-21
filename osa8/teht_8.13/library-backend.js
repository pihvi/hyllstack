const {ApolloServer, gql} = require('apollo-server')
const uuidv1 = require('uuid/v1')
const mongoose = require('mongoose')

mongoose.set('useFindAndModify', false)
const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0-ostce.mongodb.net/pihvi?retryWrites=true'

const schemaBook = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 2
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author'
  },
  genres: [
    {type: String}
  ]
})
const Book = mongoose.model('Book', schemaBook)

const schemaAuthor = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4
  },
  born: {
    type: Number,
  },
})
const Author = mongoose.model('Author', schemaAuthor)

console.log('connecting to', MONGODB_URI)
mongoose.connect(MONGODB_URI, {useNewUrlParser: true})
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
    type Book {
        title: String!
        published: Int!
        author: String!
        genres: [String!]!
        id: ID!
    }

    type Author {
        name: String!
        born: Int
        id: ID!
        bookCount: Int!
    }

  type Query {
    hello: String!
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Mutation: {
    editAuthor: (root, args) => {
      const author = authors.find(x => x.name === args.name)
      if (author) {
        author.born = args.setBornTo
      }
      return author
    },
    addBook: (root, args) => {
      const book = {...args, id: uuidv1()}
      books = books.concat(book)
      if (authors.find(x => x.name === book.author)) {
        return book
      } else {
        authors = authors.concat({name: book.author, id: uuidv1()})
        return book
      }
    }
  },
  Query: {
    hello: () => 'world',
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      return Book.find({})
    },
    allAuthors: () => Author.find({}),
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
