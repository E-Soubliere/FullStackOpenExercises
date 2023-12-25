const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body

    if (password.length <= 3) {
        console.log("Password must be at least 3 characters long")
        response.status(400).json({error: "Password must be at least 3 characters long"})
        return
    }

    if (await User.findOne({ username: username }) !== null) {
        response.status(400).json({error: "Username must be unique"})
        return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
        
    const user = new User({
        username,
        name,
        passwordHash,
    })

    const savedUser = await user
        .save()
        .catch(error => {
            console.log({error: Object.keys(error.errors).map(k => error.errors[k].message)})
            response.status(400).json({error: Object.keys(error.errors).map(k => error.errors[k].message)})
            return
        })

    response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs', {title: 1, author: 1, url: 1})

    response.json(users)
})

module.exports = usersRouter