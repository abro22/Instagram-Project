
const { model } = require("mongoose")
const Model = require("./schema.js")
const Pool = require('pg').Pool
require('dotenv').config()

//token
const tokenManager = require('./token-manager.js')

const pool = new Pool({
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: 5432
})

//MONGOOSE

//GET ALL USERS
async function getUser(req, res) {
    const userId = req.user

    await pool.query('SELECT * FROM users WHERE id = $1', [userId], (error, results) => {
        if (error) {
            throw error
        }

        res.status(200).json(results.rows)
    })
}


//CREATE USER - create user- schema
async function createUser(req, res) {
    const user = new Model({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email
    })
    console.log("Here")
    const saveUser = await user.save()
    res.status(200).json(saveUser)
}
//CREATE POST - postschema
async function createPost(req, res) {
    await pool.query('SELECT username FROM users WHERE id = $1', [req.user], (async (error, results) => {
        if (error) {
            throw error
        }

        let username = results.rows[0].username

        const post = new Model({
            userid: req.user,
            username: username,
            image: req.body.image,
            // caption: req.body.caption,
            // likes: req.body.likes,
            // comments: req.body.comments,
            timestamp: Date.now()
        })

        if (req.body.caption) {
            console.log(req.body.caption)
            post.caption = req.body.caption
        }

        const savePost = await post.save()
        res.status(200).json(savePost)
    }))
}

//GET POST
async function posts(req, res) {
    const data = await Model.find()
    res.status(200).json(data)
}

//GET POST BY ID 
async function getPost(req, res) {
    const id = req.params.id
    const post = await Model.findById(id)
    res.status(200).json(post)
}
//DELETE POST BY ID--*****
async function deletePostById(req, res) {
    const id = req.params.id
    const post = await Model.findByIdAndDelete(id)
    res.status(200).send(`Post id : ${id} was deleted`)
}
//Updating Post
async function updatePostById(req, res) {
    const id = req.params.id
    const newData = req.body
    const options = { new: true }
    const data = await Model.findByIdAndUpdate(id, newData, options)
    res.send(200).json(data)
}
//like a post 
async function likePost(req, res) {
    const postId = req.params.id
    const userId = req.user
    const post = await Model.findById(postId) // looks up the post in db that matches post in route and saves to variable
    console.log(post)
    post.likes.push(userId) // likes is an array- use push to add userid to the array
    const data = await post.save()
    res.status(200).json(data)
}
//Unlike post
async function unlikePost(req, res) {
    const postId = req.params.id
    const userId = req.user
    const post = await Model.findById(postId) // looks up the post in db that matches post in route and saves to variable
    console.log(post)
    //user is with index
    // const index = post.likes.indexOf(userId)
    // post.likes.splice (index, 1)
    for (let i = 0; i < post.likes.length; i++) {
        if (post.likes[i] === userId) {
            post.likes.splice(i, 1)
        }

        const data = await post.save()
        res.status(200).json(data)
    }
}
//Create comment
// COMMENTS - comments schema
async function createComment(req, res) {
    const postId = req.params.id
    const username = req.body.username
    const content = req.body.content
    const timestamp = Date.now()
    const post = await Model.findById(postId)

    const comment = {
        username: username,
        content: content,
        timestamp: timestamp
    }
    post.comments.push(comment)

    res.status(200).json(createComment)
}
async function deleteComment(req, res) {
    const postId = req.params.id
    const commentId = req.body.commentId
    const post = await Model.findById(postId)

    for (i = 0; i < post.comments.length; i++) {
        if (post.comments[i].id === commentId) {
            post.comments.splice(i, 1)
        }
    }

    const data = await post.save()
    res.status(200).json(data)
}


//SQL DATABASE---------------------------------------------------------------------------------------

async function userById(req, res) {
    const userid = req.user

    await pool.query('SELECT * FROM users WHERE id = $1', [userid], (error, results) => {

        if (error) {
            throw error
        }
        res.status(200).json(results.rows)

    })
}

async function registerUser(req, res) {
    const username = req.body.username
    const password = req.body.password
    const email = req.body.email

    await pool.query('INSERT INTO users (username, password, email) VALUES ($1, $2, $3)', [username, password, email], (error, results) => {

        if (error) {
            throw error
        }

        res.status(201).send('user added')
    })

}


//USER ID 
async function deleteUser(req, res) {
    const userid = req.user
    await pool.query("DELETE FROM users WHERE id = $1", [userid], (error, results) => {
        if (error) {
            throw error
        }
    })
    res.status(200).send(`User ID: ${userid} has been deleted`)
}

async function updateUser(req, res) {

    const userid = req.user

    const username = req.body.name
    const email = req.body.email
    const password = req.body.password


    await pool.query('UPDATE users SET username = $1, email = $2, password $3 WHERE id = $4', [username, email, password, userid], (error, results) => {
        if (error) {
            throw error
        }
    })
    res.status(200).send(`User ID: ${userid} was modified`)

}

async function login(req, res) {
    const email = req.body.email
    const password = req.body.password

    await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password], (error, results) => {
        if (error) {
            throw error
        }

        const token = tokenManager.generateToken(results.rows[0].id)

        res.status(200).json(token)
    })


}

module.exports = {
    posts,
    userById,
    registerUser,
    deleteUser,
    updateUser,
    login,
    createUser,
    createPost,
    getUser,
    getPost,
    deletePostById,
    updatePostById,
    likePost,
    unlikePost,
    createComment,
    deleteComment,

}













