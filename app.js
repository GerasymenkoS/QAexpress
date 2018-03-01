const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const passport = require('./config/passport')

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())
app.use(cors())


app.use('/api', require('./routes/auth'))
app.use('/api', passport.authenticate('jwt', {session: false}), require('./routes/questions'))


app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// // error handler
// app.use((err, req, res, next) => {
//     // set locals, only providing error in development
//     res.locals.message = err.message
//     res.locals.error = req.app.get('env') === 'development' ? err : {}
//
//     // render the error page
//     res.status(err.status || 500)
//     res.send(err.message)
// })

app.listen(3333, function () {
  console.log('Express running')
})

module.exports = app
