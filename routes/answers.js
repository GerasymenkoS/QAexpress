// file: index.js

const express = require('express')
const router = express.Router({mergeParams: true})
const config = require('../config')
const Question = require('../models').Question
const User = require('../models').User
const Answer = require('../models').Answer


router.get('/', async (request, response) => {
  const result = await Answer.findAll({
    where: {question_id: request.params.id},
    include: [{model: User, attributes: User.publicFields, as: 'user'}]
  })
  const newResult = result.map(model => model.get({plain: true}))
  response.json(newResult)


})
router.get('/:id', async (request, response) => {

  const result = await Answer.findById(request.params.id, {
    where: {question_id: request.params.id},
    include: [{model: User, attributes: User.publicFields, as: 'user'}]
  })

  response.json(result.get({plain: true}))


})

router.post('/', async (request, response) => {

  const {text} = request.body
  const result = await Answer.create({user_id: request.user.id, question_id: request.params.id, text})

  response.json(result.get({plain: true}))


})

module.exports = router
