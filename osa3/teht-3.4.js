const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())

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
  res.send(persons)
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
