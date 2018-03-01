// file: index.js

const express = require('express')
const router = express.Router()
const config = require('../config')
const Question = require('../models').Question
const User = require('../models').User
const answers = require('./answers')

router.get('/questions', async (request, response) => {
  const result = await Question.findAll({
    include: [{model: User, attributes: User.publicFields, as: 'user'}]
  })
  const newResult = result.map(model => model.get({plain: true}))
  response.json(newResult)


})
router.get('/questions/:id', async (request, response) => {

  const result = await Question.findById(request.params.id, {
    include: [{model: User, attributes: User.publicFields, as: 'user'}]
  })

  response.json(result.get({plain: true}))


})

router.post('/questions', async (request, response) => {

  const {name, text} = request.body
  const result = await Question.create({user_id: request.user.id, name, text})

  response.json(result.get({plain: true}))


})

router.use('/questions/:id/answers', answers)

module.exports = router
