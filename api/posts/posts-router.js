// implement your posts router here
const express = require('express')
const Post = require('./posts-model')

const router = express.Router()


//implement routes here
router.get('/', (req,res) => {
    Post.find()
    .then(posts => {
        res.json(posts)
    })
    .catch(err => {
        res.status(500).json({
            message: "The posts information could not be retrieved"
        })
    })
})

router.get('/:id', (req,res) => {
    Post.findById(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({
                message: "The user with the specified ID does not exist"
            })
        }
        res.json(post)
    })
    .catch(err => {
        res.status(404).json({
            message: "The post with the specified ID does not exist"
        })
    })
   
})

router.post('/', (req, res) => {
    const {title, contents} = req.body
    
    if(!title || !contents){
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else {
        Post.insert({title, contents})
        .then(({id}) => {
            return Post.findById(id)
        })
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({
                message: "There was an error while saving the post to the database",
                err: err.stack
            })
        })
    }
    
})

router.delete('/:id', (req,res) => {
    Post.findById(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            Post.remove(req.params.id)
            .then(removedPost => {

                res.json(post)
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The post could not be removed"
        })
    })
   
})

router.get('/:id/comments', (req, res) =>{
    
    Post.findById(req.params.id)
    .then(post => {
        if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            Post.findPostComments(req.params.id)
            .then(postComments => {

                res.json(postComments)
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            message: "The comments information could not be retrieved"
        })
    })
})

router.put('/:id', (req,res) => {
    const {title, contents} = req.body
    if (!title || !contents) {
        res.status(400).json({
            message: "Please provide title and contents for the post"
        })
    } else{
        Post.findById(req.params.id)
        .then(post => {
            if(!post){
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else {
            
            return Post.update(req.params.id, req.body)
        }
    })
    .then(data => {
        if(data) {
            return Post.findById(req.params.id)
        }
    })
    .then(post => {
        res.json(post)
    })
    .catch(err => {
        res.status(500).json({
            message: "The post information could not be modified"
        })
    })
}
})

//export routes to server.js
module.exports = router;