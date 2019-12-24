const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const {ApolloServer, gql} = require('apollo-server')
const {UserInputError, AuthenticationError} = require('apollo-server-errors')

mongoose.set('useFindAndModify', false)
const MONGODB_URI = 'mongodb+srv://fullstack:fullstack@cluster0-ostce.mongodb.net/pihvi?retryWrites=true'
const JWT_SECRET = 'TODO: put this key somewhere else :)'

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
        me: User
    }

    type User {
        username: String!
        favoriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
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

        createUser(
            username: String!
            favoriteGenre: String!
        ): User

        login(
            username: String!
            password: String!
        ): Token
    }
`

const resolvers = {
  Mutation: {
    editAuthor: async (root, args) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const author = await Author.findOne({name: args.name})
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    addBook: async (root, args) => {
      if (!context.currentUser) {
        throw new AuthenticationError("not authenticated")
      }
      const name = args.author
      args.author = await Author.findOne({name})
      if (!args.author) {
        const author = new Author({name})
        try {
          args.author = await author.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }
      }
      const book = new Book({...args})
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
    },
    createUser: (root, args) => {
      const user = new User({username: args.username})
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({username: args.username})
      if (!user || args.password !== 'secret') {
        throw new UserInputError("wrong credentials")
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      }
      return {value: jwt.sign(userForToken, JWT_SECRET)}
    },
  },
  Query: {
    hello: () => 'world',
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: () => Book.find().populate('author'),
    allAuthors: () => Author.aggregate([{
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: 'author',
        as: 'books'
      }
    }, {
      $project: {
        name: true,
        born: true,
        bookCount: {$cond: {if: {$isArray: '$books'}, then: {$size: '$books'}, else: 0}}
      }
    }]),
    me: (root, args, context) => {
      return context.currentUser
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req}) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id).populate('friends')
      return {currentUser}
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
