// implement your server here
// require your posts router and connect it here
const express = require('express')
const server = express();

// import Routes
const postRoutes = require('./posts/posts-router')

// implement Routes
server.use('/posts', postRoutes)

module.exports = server