const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const config = require('./config')
const passport = require('passport')
const passportJWT = require('passport-jwt')
const User = require('./models').User
const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())


app.use('/api', require('./routes/auth'))
app.use('/api', require('./routes/questions'))

const jwtOptions = {}

jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = config.get('secretToken')

const strategy = new JwtStrategy(jwtOptions, async(jwt_payload, next) => {
    console.log('payload received', jwt_payload)

    const user = await User.findById(jwt_payload.id)

    if (user) {
        next(null, user)
    } else {
        next(null, false)
    }
})


passport.use(strategy)


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

app.listen(3333, function() {
    console.log('Express running')
})

module.exports = app
