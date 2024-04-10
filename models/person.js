import { model, Schema } from 'mongoose'

const personSchema = new Schema({
  name: {
    type: String,
    minLength: [3, 'Name must be at least 3 characters long'],
    required: [true, 'User name required']
  },
  number: {
    type: String,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{8,}$/.test(v)
      },
      message: props => `${props.value} is not a valid number format!`
    },
    required: [true, 'User number required']
  }
})
const Person = model('Person', personSchema)

export default Person
