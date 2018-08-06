const mongoose = require('mongoose')
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true})
mongoose.Promise = global.Promise

const Person = mongoose.model('Person', {
  name: String,
  num: String
})

if (process.argv.length === 4) {
  const pers = new Person({
    name: process.argv[2],
    num: process.argv[3]
  })
  console.log('lisätään henkilö', process.argv[2], 'numero', process.argv[3], 'luetteloon')
  pers
    .save()
    .then(response => {
      mongoose.connection.close()
    })
} else {
  Person
    .find({})
    .then(result => {
      console.log('puhelinluettelo:')
      result.forEach(x => {
        console.log(x.name, x.num)
      })
      mongoose.connection.close()
    })
}
