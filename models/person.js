import mongoose, { model, Schema } from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

const personSchema = new Schema({
  name: String,
  number: Number
})
const Person = model('Person', personSchema)

export default Person
