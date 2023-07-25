const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.post('/', async (req, res, next) => {
  const { username, name, password } = req.body

  const saltRounds = 10
  const passwordHash = bcrypt.hash(password, saltRounds)

  const user = new User({
    username, 
    name,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    res.json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/', async(req, res, next) => {
  try {
    const users = await User.find({}).populate('posts')
    res.json(users)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:userId', async(req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter