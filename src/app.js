import express from 'express'
import cors from 'cors'
import mongo from '../mongo.js'
import Person from '../models/person.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
let people = []

app.get('/api/people', (request, response) => {
  Person.find({}).then(people => {
    response.json(people)
  })
})

app.get('/info', (request, response) => {
  const totalpeople = people.length
  request.timestamp = new Date()
  const date = request.timestamp.toLocaleString()
  response.send(`<p>Phone book has info for ${totalpeople} people</p>
  <p>${date}</p>
  `)
})

app.get('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = people.find((person) => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/people/:id', (request, response) => {
  const id = Number(request.params.id)
  people = people.filter((person) => person.id !== id)

  response.status(204).end()
})

app.post('/api/people', (request, response) => {
  const person = request.body
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: 'content missing'
    })
  }
  const numberDuplicate = people.some(
    (existingPerson) => existingPerson.name === person.name
  )
  if (numberDuplicate) {
    return response.status(400).json({
      error: 'name have to be unique'
    })
  }
  const newPerson = new Person({
    name: person.name,
    number: person.number
  })

  newPerson.save().then((savedNoted) => {
    response.json(savedNoted)
  })
})

app.use((request, response) => {
  response.status(404).json({
    error: 'Error 404 Not found page'
  })
})
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
