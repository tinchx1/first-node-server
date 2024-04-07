import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectionString = process.env.MONGO_DB_URI

mongoose.connect(connectionString)
  .then(() => {
    console.log('Database connected')
  }).catch(err => {
    console.error(err)
  })

export default 'mongo.js'
