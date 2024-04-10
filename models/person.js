import { model, Schema } from 'mongoose'

const personSchema = new Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: Number
})
const Person = model('Person', personSchema)

export default Person
