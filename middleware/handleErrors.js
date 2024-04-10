export const handleErrors = (error, request, response, next) => {
  console.log(error)
  if (error.name === 'CastError') {
    response.status(400).send({ error: 'id used is malformed' })
  } else if (error.name === 'ValidationError') {
    response.status(400).send({ error: error.message })
  } else {
    response.status(500).end()
  }
}
