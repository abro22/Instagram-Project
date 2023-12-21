require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const queries = require('./queries.js')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())


const dbString = process.env.DATABASE_URL
mongoose.connect(dbString)
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log("MongoDB Connected")
})

//HOMEPAGE
app.get("/", (req, res) => {
    res.send("Hello World ")
})
//CREATE USER
app.get("/createuser", queries.createUser)

//CREATE POST
app.get("/createpost", queries.createPost)

//CREATE COMMENT
app.get("/comment/postid", queries.createComment)



app.listen(3000)
console.log("Express is running")