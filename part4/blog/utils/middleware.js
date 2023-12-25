const jwt = require('jsonwebtoken')
const User = require('../models/user')

const tokenExtractor = async (request, response, next) => {
    const authorization = request.get('Authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      request['token'] = authorization.replace('Bearer ', '')
    }

    next()
}

const userExtractor = async (request, response, next) => {
    if (!request.token) {
        return response.status(401).json({error: 'token missing'})
    }
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

    if (user === null) {
        return response.status(401).json({ error: 'user invalid' })
    }

    request['user'] = { 
        id: user.id,
        username: user.username,
        name: user.name,
    }

    next()
}

const requestLogger = (request, response, next) => {
    console.log('<-------------------------------------->')
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('<-------------------------------------->')
    next()
}

const errorLogger = (error, request, response, next) => {
    console.log(error.message)
}

module.exports = {
    requestLogger,
    errorLogger,
    tokenExtractor,
    userExtractor
}