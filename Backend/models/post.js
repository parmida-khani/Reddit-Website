const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    text: String,
    username: String,
    numOfCommentLikes: {
        type:Number,
        default:0
    },
    numOfCommentDislikes: {
        type:Number,
        default:0
    }
})

const Comment = mongoose.model('Comment', commentSchema);

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    communityName: {
        type: String,
        required: true
    },
    publisherUsername: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    publishDate: {
        type: String,
        required: false
    },
    numOfLikes: {
        type: Number,
        default: 0
    },
    numOfDislikes: {
        type: Number,
        default: 0
    },
    numOfComments: {
        type: Number,
        default: 0
    },
    image: {
        type: String
    },
    comments: [commentSchema]
    ,
    userLikes: {
        type: [String],
        required: false,
        default: []
    }
})

module.exports = mongoose.model("Post", postSchema);
