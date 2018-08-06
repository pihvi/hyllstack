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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
