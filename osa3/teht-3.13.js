const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person.js')

app.use(cors())
app.use(bodyParser.json())
morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :body :status :res[content-length] - :response-time ms'))

let persons = [{
  "name": "Arto Hellas",
  "num": "040-123456",
  "id": 1
}, {
  "name": "Martti Tienari",
  "num": "040-123456",
  "id": 2
}, {
  "name": "Arto Järvinen",
  "num": "040-123456",
  "id": 3
}, {
  "name": "Lea Kutvonen",
  "num": "040-123456",
  "id": 4
}]


app.get('/api/persons', (req, res) => {
  Person
    .find({})
    .then(result => {
      res.send(result)
    })
})

app.get('/api/persons/:id', (req, res) => {
  const found = persons.find(p => p.id === Number(req.params.id))
  res.status(found ? 200 : 404).send(found)
})

// curl -XDELETE http://localhost:3001/api/persons/3
app.delete('/api/persons/:id', (req, res) => {
  persons = persons.filter(p => p.id !== Number(req.params.id))
  res.end()
})

// curl -XPOST http://localhost:3001/api/persons -d '{"name":"john","num":"123455"}' -H 'Content-Type: application/json'
app.post('/api/persons', (req, res) => {
  const pers = {
    id: Math.floor(Math.random() * 10000000),
    name: req.body.name,
    num: req.body.num
  }
  if (!pers.name || !pers.num) {
    res.status(400).send({message: 'missing name or number'})
  } else if (persons.find(p => p.name === pers.name)) {
    res.status(400).send({message: 'person already in data'})
  } else {
    persons.push(pers)
    res.send(pers)
  }
})

app.get('/info', (req, res) => {
  res.send(`
    <html>
      <body>
        <p>puhelinluettelossa ${persons.length} henkilön tiedot</p>
        <p>${new Date}</p>
      </body>
    </html>
  `)
})

app.use(express.static('build'))

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
