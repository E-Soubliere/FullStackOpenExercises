const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response,) => {
    await Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
})

blogsRouter.post('/', Middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    const user = request.user
    console.log("=================================")
    console.log(user)
    const newBlog = new Blog({
        title:  body.title,
        author: body.author,
        url:    body.url,
        likes:  0,
        user: user.id,
    })
  
    const savedBlog = await newBlog
        .save()
        .catch(error => {
            console.log(error)
        })
    
    let savedUser = await User.findOne({_id: user.id})
    savedUser.blogs = savedUser.blogs.concat(savedBlog._id)
    await savedUser.save()

    response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', Middleware.userExtractor, async (request, response) => {
    const id = request.params.id
    const user = request.user
    console.log(user)
    const deleteBlog = await Blog.findOne({_id: user.id})
    if (deleteBlog.id !== user.id) {
        return response.status(401).json({error: 'Only the blog owner can delete this blog'})
    }

    await Blog
        .deleteOne({_id: id})
        .then(result => {
            response.status(204).end()
        })
        .catch(error => {
            console.log(error)
        })
})

blogsRouter.put('/:id', async (request, response) => {
    const id = request.params.id

    let blog = await Blog
        .findOne({_id: id})
    blog.likes = blog.likes + 1

    await blog
        .save()
        .then(result => {
        response.json(blog)
        })
        .catch(error => {
        console.log(error)
        })

})

module.exports = blogsRouter