const express = require('express')
const app = express()
const router = require('./routes')
const port = process.env.port || 3000
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const { AxiosHeaders } = require('axios')

app.engine('.hbs', engine({ extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

//session
app.use(session({
  secret: 'ThisIsSecret',
  resave: false,
  saveUninitialized: false,
}))
app.use(flash())
app.use(router)

app.listen(port, () =>{
  console.log(`app.js listening on port ${port}`)
})
