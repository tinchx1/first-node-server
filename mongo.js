import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.MONGODB_URI
console.log(connectionString)
mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

export default 'mongo.js'
