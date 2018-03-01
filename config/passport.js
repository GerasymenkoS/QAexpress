const config = require('./index')
const passport = require('passport')
const passportJWT = require('passport-jwt')

const User = require('../models').User

const ExtractJwt = passportJWT.ExtractJwt
const JwtStrategy = passportJWT.Strategy

const jwtOptions = {}
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
jwtOptions.secretOrKey = config.get('secretToken')

const strategy = new JwtStrategy(jwtOptions, async (jwt_payload, next) => {
  console.log('payload received', jwt_payload)

  const user = await User.findById(jwt_payload.id)

  if (user) {
    next(null, user.get({plain:true}))
  } else {
    next(null, false)
  }
})


passport.use(strategy)

module.exports = passport
