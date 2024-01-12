//ROUTES


require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const queries = require('./queries.js')
// const bodyParser = require('body-parser')
const app = express()
const tokenManager = require('./token-manager.js')

const cors = require('cors')


//SQL setup/ express config
app.use(cors())
const bodyParser = require("body-parser")

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true
    })
)

// Mongoose connection 
const dbString = process.env.DATABASE_URL
mongoose.connect(dbString)
const database = mongoose.connection



//Database config
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log("MongoDB Connected")
})
//-------------------------------------CONNECTIONS



//HOMEPAGE
app.get("/", (req, res) => {
    res.send("Hello World ")
})

//GET ALL USERS
app.get("/getusers", tokenManager.authenticateToken, queries.getUser)



//CREATE USER
app.post("/createuser", tokenManager.authenticateToken, queries.createUser)

//------

//GET ALL POST

app.get("/posts", tokenManager.authenticateToken, queries.posts)

//GET POST BY ID
app.get("/post/:id", tokenManager.authenticateToken, queries.getPost)

//CREATE POST
app.post("/createpost", tokenManager.authenticateToken, queries.createPost)

//Delete Post
app.delete("/deletepost/:id", tokenManager.authenticateToken, queries.deletePostById)

//UPDATE POST
app.put("/update/:id", tokenManager.authenticateToken, queries.updatePostById)

//Likes
app.post("/post/:id/likes", tokenManager.authenticateToken, queries.likePost)


//Unlike a post
app.post("/post/:id/unlike", tokenManager.authenticateToken, queries.unlikePost)


// //CREATE COMMENT
app.post("/post/:id/comment", tokenManager.authenticateToken, queries.createComment)

//DELETE comment

app.delete("/post/:id/comment", tokenManager.authenticateToken, queries.deleteComment)
//----------------------------------------------------------------SQL





app.get("/", (req, res) => {
    res.send("Hello World")
})

//SQL USERS DATABASE

//Get info about a specific user 
app.get("/users/:id", tokenManager.authenticateToken, queries.userById)

// //Register new user
app.post("/users", queries.registerUser)

// //Delete user (only self)
app.delete("/users/:id", tokenManager.authenticateToken, queries.deleteUser)

// //Update user info
app.put("/users/:id", tokenManager.authenticateToken, queries.updateUser)


//Login
app.post('/login', queries.login)



app.listen(3000)
console.log("Express is running")