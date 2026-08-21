import express from 'express'

const app = express()

app.get('/health', ( request, response ) => {
  return response
})

app.listen('/', () => {
  console.log(`server is runnig in ${process.env.PORT}`)
})