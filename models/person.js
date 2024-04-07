import mongoose, { model, Schema } from 'mongoose'

const personSchema = new Schema({
  name: String,
  number: Number
})
const Person = model('Person', personSchema)

export default Person
