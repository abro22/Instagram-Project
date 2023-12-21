
const { model } = require("mongoose")
const Model = require("./schema.js")


//CREATE USER - create user schema
async function createUser(req, res) {
    const user = new Model({
        name: req.body.name,
        age: req.body.age,
        email: req.body.email

    })

    const saveUser = await user.save()
    res.status(200).json(saveUser)

}

//CREATE POST - postschema
async function createPost(req, res) {
    const post = new Model({
        // userid: req.body.userid,
        username: req.body.username,
        image: req.body.image,
        caption: req.body.caption,
        likes: req.body.likes,
        comments: req.body.comments,
        timestamp: Date.now()

    })
    const savePost = await post.save()

    res.send(200).json(savePost)


}

//COMMENTS - comments schema
async function createComment(req, res) {
    const comment = new Model({
        username: req.body.username,
        content: req.body.content,
        timestamp: req.body.timestamp
    })
    const saveComment = await comment.save()
    res.send(200).json(saveComment)
}


module.exports = {
    createUser,
    createPost,
    createComment



}