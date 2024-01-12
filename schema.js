const mongoose = require('mongoose');


//CREATE USER
const createUser = new mongoose.Schema({

    name: {
        required: true,
        type: String
    },

    age: {
        required: true,
        type: Number

    },

    email: {
        required: true,
        type: String

    }


})


//COMMENTS
const commentSchema = new mongoose.Schema({
    commentid: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    content: {
        required: true,
        type: String
    },
    timestamp: {
        required: true,
        type: Number
    }

})


//CREATE POST
const postsSchema = new mongoose.Schema({
    userid: {
        required: true,
        type: Number
    },
    username: {
        required: true,
        type: String
    },
    image: {
        required: true,
        type: String
    },
    caption: {
        required: false,
        type: String
    },
    likes: {
        required: false,
        type: [String]  // change to array of strings to hold user id
    },
    comments: {
        require: false,
        type: [commentSchema]
    },
    timestamp: {
        required: true,
        type: Number
    }

})


// module.exports = mongoose.model('Comment', commentSchema)
module.exports = mongoose.model('Data', postsSchema)
// module.exports = mongoose.model('Data', createUser)