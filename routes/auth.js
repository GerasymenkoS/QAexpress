// file: index.js

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const router = express.Router()
const config = require('../config')
const User = require('../controllers/user')()

const passportJWT = require('passport-jwt')

const ExtractJwt = passportJWT.ExtractJwt

const jwtOptions = {}


jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()

router.post('/login', async(request, response) => {

    const {password, email} = request.body
    const user = await User.getUserByEmail(email)
    if (!await User.authenticateUser(password, user)) {
        response.status(401).json({message: 'passwords did not match'})
    }

    response.json({
        message: 'ok',
        token: jwt.sign(user.get({plain: true}), config.get('secretToken'))
    })


})

router.post('/register', async(request, response) => {

    const user = await User.createUser(request.body)

    response.json({
        message: 'ok',
        token: jwt.sign(user[0].get({plain: true}), config.get('secretToken'))
    })


})


module.exports = router
