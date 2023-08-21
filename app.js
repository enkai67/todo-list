const { urlencoded } = require('express')
const express = require('express')
const app = express()
const port = process.env.port || 3000

const { engine } = require('express-handlebars')

const db = require('./models')
const Todo = db.Todo

app.engine('.hbs', engine({ extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) =>{
  res.render('index')
})

app.get('/todos', (req, res) => {
	return Todo.findAll({
    attributes: ['id' , 'name'],
    raw: true
  })
		.then((todos) => res.render('todos', {todos}))
		.catch((err) => res.status(422).json(err))
})

app.get('/todos/new',(req, res) => {
  res.render('new')
})

app.get('/todos/:id/edit',(req, res) => {
  res.send(`app get ${req.params.id} page`)
})

app.get('/todos/:id',(req, res) => {
  const id  = req.params.id
  return Todo.findByPk(id, {
    attributes: ['id', 'name'], 
    raw : true
  })
   .then((todo) => {res.render('todo', {todo})})
})

app.post('/todos',(req, res) => {
  const name = req.body.name
  console.log(req)
  return Todo.create({ name })
    .then(() => res.redirect('/todos'))
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
