const express = require('express')
const app = express()
const router = require('./routes')
const messageHandler = require('./middlewares/message-handler')
const errorHandler = require('./middlewares/error-handler')
const port = process.env.port || 3000
const { engine } = require('express-handlebars')
const methodOverride = require('method-override')
const flash = require('connect-flash')
const session = require('express-session')
const { AxiosHeaders } = require('axios')
const passport = require('passport')

if( process.env.NODE_ENV = 'development') {
  require('dotenv').config()
}

app.engine('.hbs', engine({ extname: '.hbs'}))
app.set('view engine', '.hbs')
app.set('views', './views')

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
app.use(passport.initialize())

//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))
app.use(flash())
app.use(messageHandler)
app.use(router)
app.use(errorHandler) //繼續處理router丟出的錯誤，所以會放在router後

app.listen(port, () =>{
  console.log(`app.js listening on port ${port}`)
})
