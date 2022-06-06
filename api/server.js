// implement your server here
// require your posts router and connect it here
const express = require('express')
const server = express();
server.use(express.json())

// import Routes
const postRoutes = require('./posts/posts-router')


// configure Routes
server.use('/api/posts', postRoutes)



//export server to index.js
module.exports = server