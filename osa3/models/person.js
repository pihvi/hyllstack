const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  num: String
})

module.exports = Person
