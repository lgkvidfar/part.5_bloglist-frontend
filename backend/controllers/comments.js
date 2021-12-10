const commentsRouter = require('express').Router()
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment
    .find({}).populate('user', { username: 1, name: 1 })

  response.json(comments.map(c => c.toJSON()))
})

commentsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = middleware.getTokenFromReq(request)
  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const comment = new Comment({
    content: body.content,
    user: user._id  
})

  const savedComment = await comment.save()
  user.comments = user.comments.concat(savedComment._id)
  await user.save()

  response.json(savedComment.toJSON())
})

commentsRouter.get('/:id', async (request, response) => {
  const comment = await Comment.findById(request.params.id)
  if (comment) {
    response.json(comment.toJSON())
  } else {
    response.status(404).end()
  }
})

commentsRouter.put('/:id', (request, response, next) => {
  const body = request.body
  const comment = {
    title: body.content,
    user: body.user
  }

  Comemnt.findByIdAndUpdate(request.params.id, comment, { new: true })
    .then(updatedComment => {
      response.json(updatedComment.toJSON())
    })
    .catch(error => next(error))
})

commentsRouter.delete('/:id', async (request, response) => {
  await Comment.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

module.exports = commentsRouter