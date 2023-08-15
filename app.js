const express = require('express')
const app = express()
const port = process.env.port || 3000

app.get('/', (req, res) =>{
  res.send('hello')
})

app.get('/todos',(req, res) => {
  res.send('app get /todos page')
})

app.get('/todos/:id',(req, res) => {
  res.send(`app get ${req.params.id} page`)
})

app.get('/todos/new',(req, res) => {
  res.send('app get /todos/new page')
})

app.post('/todos',(req, res) => {
  res.send('app post /todos page')
})

app.get('/todos/:id/edit',(req, res) => {
  res.send(`app get ${req.params.id} page`)
})

app.put('/todos/:id',(req, res) => {
  res.send(`app put ${req.params.id} page`)
})

app.delete('/todos/:id',(req, res) => {
  res.send(`app delete ${req.params.id} page`)
})

app.listen(port, () =>{
  console.log(`app.js listening on port ${port}`)
})
