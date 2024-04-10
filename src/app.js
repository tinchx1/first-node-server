import express from 'express'
import cors from 'cors'
import mongo from '../mongo.js'
import Person from '../models/person.js'
import dotenv from 'dotenv'
import { notFound } from '../middleware/notFound.js'
import { handleErrors } from '../middleware/handleErrors.js'
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const people = []

app.get('/api/people', (request, response, next) => {
  Person.find({})
    .then(people => {
      response.json(people)
    })
    .catch(error => {
      next(error)
    })
})

app.get('/info', (request, response) => {
  const totalPeople = Person.length
  request.timestamp = new Date()
  const date = request.timestamp.toLocaleString()
  response.send(`<p>Phone book has info for ${totalPeople} people</p>
  <p>${date}</p>
  `)
})

app.get('/api/people/:id', (request, response, next) => {
  const { id } = request.params
  Person.findById(id).then(person => {
    if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
  }).catch(error => {
    next(error)
  })
})

app.delete('/api/people/:id', (request, response, next) => {
  const { id } = request.params
  Person.findByIdAndDelete(id).then(person =>
    response.status(204).end()
  ).catch(error => next(error))
})

app.post('/api/people', (request, response, next) => {
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

  newPerson.save()
    .then((savedNoted) => {
      response.json(savedNoted)
    })
    .catch(error => next(error))
})

app.put('/api/people/:id', (request, response) => {
  const { id } = request.params
  const person = request.body
  const newPerson = {
    name: person.name,
    number: person.number
  }
  Person.findByIdAndUpdate(id, newPerson, { new: true })
    .then(result => {
      response.json(result)
    })
})

app.use(notFound)
app.use(handleErrors)
const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

export default app
