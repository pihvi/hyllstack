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
      author: Author!
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
    editAuthor: async (root, args) => {
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo
      return author.save()
    },
    addBook: async (root, args) => {
      const name = args.author
      args.author = await Author.findOne({name})
      if (!args.author) {
        const author = new Author({name})
        args.author = await author.save()
      }
      const book = new Book({...args})
      return book.save()
    }
  },
  Query: {
    hello: () => 'world',
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      return Book.find({}).populate('author')
    },
    allAuthors: async () => (await Author.find({})).map(author => {
      author.bookCount = 99
      return author
    }),
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
